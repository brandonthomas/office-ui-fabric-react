import * as React from 'react';
import { BaseComponent, classNamesFunction, IPoint, warnMutuallyExclusive } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyleProps, IDualRangeInputStyles, IDualRangeInputState } from './DualRangeInput.types';

/**
 * TODO : ADD RTL SUPPORT
 * TODO: Test touch
 * TODO: Write tests
 * TODO: convert to arrow functions/remove bind
 * TODO: Expose render methods for thumbs
 */

const getClassNames = classNamesFunction<IDualRangeInputStyleProps, IDualRangeInputStyles>();

// The delta in which we can infer a drag is happening
// primarily used to disable transitions
const dragDelta: number = 10;

export class DualRangeInputBase extends BaseComponent<IDualRangeInputProps, IDualRangeInputState> {
  public static defaultProps: Partial<IDualRangeInputProps> = {
    min: 0,
    max: 100,
    step: 1
  };
  private _startRef: HTMLInputElement;
  private _endRef: HTMLInputElement;
  private _interactTarget: HTMLInputElement;
  private _startPerc: number;
  private _endPerc: number;
  private _targetRect: DOMRect | ClientRect;
  private _rafRef: number;
  private _mouseDownOrigin: IPoint;

  public static getDerivedStateFromProps(
    nextProps: Readonly<IDualRangeInputProps>,
    state: Readonly<IDualRangeInputState>
  ): Partial<IDualRangeInputState> {
    return {
      ...(nextProps.startValue &&
        nextProps.startValue !== state.startValue && {
          startValue: nextProps.startValue > state.endValue ? state.endValue : nextProps.startValue
        }),
      ...(nextProps.endValue &&
        nextProps.endValue !== state.endValue && {
          endValue: nextProps.endValue < state.startValue ? state.startValue : nextProps.endValue
        })
    };
  }

  public constructor(props: IDualRangeInputProps) {
    super(props);
    this.state = {
      enableTransitions: true,
      startValue: props.startValue ? props.startValue : props.defaultStartValue ? props.defaultStartValue : 0,
      endValue: props.endValue ? props.endValue : props.defaultEndValue ? props.defaultEndValue : 100
    };
    this._setStartRef = this._setStartRef.bind(this);
    this._setEndRef = this._setEndRef.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._directInputHandler = this._directInputHandler.bind(this);
    warnMutuallyExclusive('RangeSlider', props, { endValue: 'defaultEndValue', startValue: 'defaultStartValue' });
  }

  public render(): JSX.Element {
    const {
      styles,
      theme,
      className,
      min,
      max,
      startAriaLabel,
      endAriaLabel,
      startAriaValueText,
      endAriaValueText,
      startAriaValueNow,
      endAriaValueNow,
      step,
      disabled
    } = this.props;

    const { startValue, endValue, enableTransitions } = this.state;

    this._startPerc = (startValue - min!) / (max! - min!);
    this._endPerc = (endValue - min!) / (max! - min!);
    const classNames = getClassNames(styles, { theme: theme!, className, enableTransitions, disabled });
    return (
      <div className={classNames.root} onMouseDown={this._onMouseDown}>
        <div className={classNames.startDeadSpace} style={{ flexBasis: `${this._startPerc * 100}%` }} />
        <div className={classNames.startContainer}>
          <input
            aria-label={startAriaLabel}
            min={min}
            max={max}
            value={String(startValue)}
            type="range"
            className={classNames.startRange}
            onChange={this._onInput}
            ref={this._setStartRef}
            aria-valuetext={startAriaValueText}
            aria-valuenow={startAriaValueNow}
            step={step}
          />
          <div className={classNames.startThumb} />
        </div>
        <div className={classNames.filler} />
        <div className={classNames.endContainer}>
          <input
            aria-label={endAriaLabel}
            min={min}
            max={max}
            value={String(endValue)}
            type="range"
            className={classNames.endRange}
            onChange={this._onInput}
            ref={this._setEndRef}
            aria-valuetext={endAriaValueText}
            aria-valuenow={endAriaValueNow}
            step={step}
          />
          <div className={classNames.endThumb} />
        </div>
        <div className={classNames.endDeadSpace} style={{ flexBasis: `${(1 - this._endPerc) * 100}%` }} />
      </div>
    );
  }

  private _setStartRef(ref: HTMLInputElement): void {
    this._startRef = ref;
  }

  private _setEndRef(ref: HTMLInputElement): void {
    this._endRef = ref;
  }
  private _onInput(event: React.FormEvent<HTMLInputElement>): void {
    this._handleInput(event.target as HTMLInputElement);
  }

  private _handleInput(target: HTMLInputElement): void {
    const startValue = target === this._startRef ? Math.min(+target.value, this.state.endValue) : this.state.startValue;
    const endValue = target === this._endRef ? Math.max(+target.value, this.state.startValue) : this.state.endValue;
    const updateStartValue = this.state.startValue !== startValue;
    const updateEndValue = this.state.endValue !== endValue;
    const state = {
      ...(!this.props.startValue && updateStartValue && { startValue }),
      ...(!this.props.endValue && updateEndValue && { endValue })
    };
    if (updateStartValue || updateEndValue) {
      this.setState(state);
      if (this.props.onChange) {
        this.props.onChange(startValue, endValue);
      }
    }
  }

  private _directInputHandler(e: Event): void {
    this._handleInput(e.target as HTMLInputElement);
  }

  private _onMouseDown(event: React.MouseEvent<HTMLElement>): void {
    const { min, max } = this.props;
    this._targetRect = (event.currentTarget as HTMLInputElement).getBoundingClientRect();
    this._mouseDownOrigin = { x: event.clientX, y: event.clientY };
    const perc = (event.clientX - this._targetRect.left) / this._targetRect.width;
    this._interactTarget = perc <= (this._endPerc - this._startPerc) / 2 + this._startPerc ? this._startRef : this._endRef;

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    this._interactTarget.addEventListener('change', this._directInputHandler);
    // Event constructor supported so use it
    let syntheticEvent;
    if (typeof Event === 'function') {
      syntheticEvent = new Event('change');
    } else {
      syntheticEvent = document.createEvent('Event');
      // ie11 only supports change events on range input so use that
      syntheticEvent.initEvent('change', true, true);
    }

    const newValue = (max! - min!) * perc + min!;
    this._interactTarget.value = String(newValue);
    this._interactTarget.dispatchEvent(syntheticEvent);
  }

  private _onMouseMove(event: MouseEvent): void {
    // detect a reasonable distance has been moved with mouse and turn off transitions
    if (
      this.state.enableTransitions &&
      (Math.abs(event.clientX - this._mouseDownOrigin.x) > dragDelta || Math.abs(event.clientY - this._mouseDownOrigin.y) > dragDelta)
    ) {
      this.setState({ enableTransitions: false });
    }
    // debounce mouse events since they can occur far more often than the browser can paint
    window.cancelAnimationFrame(this._rafRef);
    this._rafRef = window.requestAnimationFrame(() => {
      const { min, max, step } = this.props;
      const perc = (event.clientX - this._targetRect.left) / this._targetRect.width;
      const newValue = (max! - min!) * perc;
      // ensure we are rounding to the right values so our comparison below works
      const newRoundedValue = Math.round(newValue / step!) * step! + min!;

      // only dispatch if we actually changed the value
      if (+this._interactTarget.value !== newRoundedValue) {
        // Event constructor supported so use it
        let syntheticEvent;
        if (typeof Event === 'function') {
          syntheticEvent = new Event('change');
        } else {
          syntheticEvent = document.createEvent('Event');
          // ie11 only supports change events on range input so use that
          syntheticEvent.initEvent('change', true, true);
        }
        this._interactTarget.value = String(newRoundedValue);
        this._interactTarget.dispatchEvent(syntheticEvent);
      }
    });
  }

  private _onMouseUp(_event: MouseEvent): void {
    this._interactTarget.focus();
    this._interactTarget.removeEventListener('change', this._directInputHandler);
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
    // re-enable transitions now that direct manipulation has ended
    this.setState({ enableTransitions: true });
  }
}

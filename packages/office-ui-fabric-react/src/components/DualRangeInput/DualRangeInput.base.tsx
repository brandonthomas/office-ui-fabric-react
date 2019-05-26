import * as React from 'react';
import { BaseComponent, classNamesFunction, IPoint } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyleProps, IDualRangeInputStyles, IDualRangeInputState } from './DualRangeInput.types';

/**
 * TODO : ADD RTL SUPPORT
 */

const getClassNames = classNamesFunction<IDualRangeInputStyleProps, IDualRangeInputStyles>();

const dragDelta: number = 10;

export class DualRangeInputBase extends BaseComponent<IDualRangeInputProps, IDualRangeInputState> {
  public static defaultProps: Partial<IDualRangeInputProps> = {
    min: 0,
    max: 100,
    startValue: 10,
    endValue: 80
  };
  private _startRef: HTMLInputElement;
  private _endRef: HTMLInputElement;
  private _startDeadspaceRef: HTMLDivElement;
  private _endDeadspaceRef: HTMLDivElement;
  private _startValue: number;
  private _endValue: number;
  private _interactTarget: HTMLInputElement;
  private _startPerc: number;
  private _endPerc: number;
  private _targetRect: DOMRect | ClientRect;
  private _rafRef: number;
  private _mouseDownOrigin: IPoint;
  public constructor(props: IDualRangeInputProps) {
    super(props);
    this.state = {
      enableTransitions: true
    };
    this._startValue = props.startValue!;
    this._endValue = props.endValue!;
    this._setStartRef = this._setStartRef.bind(this);
    this._setEndRef = this._setEndRef.bind(this);
    this._onInput = this._onInput.bind(this);
    this._setStartDeadspaceRef = this._setStartDeadspaceRef.bind(this);
    this._setEndDeadspaceRef = this._setEndDeadspaceRef.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._directInputHandler = this._directInputHandler.bind(this);
  }

  public render(): JSX.Element {
    const { styles, theme, className, min, max, startValue, endValue, startAriaLabel, endAriaLabel } = this.props;
    const classNames = getClassNames(styles, { theme: theme!, className, enableTransitions: this.state.enableTransitions });
    return (
      <div className={classNames.root} onMouseDown={this._onMouseDown}>
        <div className={classNames.startDeadSpace} ref={this._setStartDeadspaceRef} />
        <div className={classNames.startContainer}>
          <input
            aria-label={startAriaLabel}
            min={min}
            max={max}
            defaultValue={String(startValue)}
            type="range"
            className={classNames.startRange}
            onInput={this._onInput}
            onChange={this._onInput}
            ref={this._setStartRef}
          />
          <div className={classNames.startThumb} />
        </div>
        <div className={classNames.filler} />
        <div className={classNames.endContainer}>
          <input
            aria-label={endAriaLabel}
            min={min}
            max={max}
            defaultValue={String(endValue)}
            type="range"
            className={classNames.endRange}
            onInput={this._onInput}
            onChange={this._onInput}
            ref={this._setEndRef}
          />
          <div className={classNames.endThumb} />
        </div>
        <div className={classNames.endDeadSpace} ref={this._setEndDeadspaceRef} />
      </div>
    );
  }

  public componentDidMount(): void {
    this._updateVisuals();
  }

  private _setStartRef(ref: HTMLInputElement): void {
    this._startRef = ref;
  }

  private _setEndRef(ref: HTMLInputElement): void {
    this._endRef = ref;
  }

  private _setStartDeadspaceRef(ref: HTMLInputElement): void {
    this._startDeadspaceRef = ref;
  }

  private _setEndDeadspaceRef(ref: HTMLInputElement): void {
    this._endDeadspaceRef = ref;
  }

  private _onInput(event: React.FormEvent<HTMLInputElement>): void {
    this._handleInput(event.target as HTMLInputElement);
  }

  private _handleInput(target: HTMLInputElement): void {
    if (this._startRef === target) {
      if (+target.value > this._endValue) {
        target.value = String(this._endValue);
      }
      this._startValue = +target.value;
    }
    if (this._endRef === target) {
      if (+target.value < this._startValue) {
        target.value = String(this._startValue);
      }
      this._endValue = +target.value;
    }

    this._updateVisuals();

    if (this.props.onInput) {
      this.props.onInput(this._startValue, this._endValue);
    }
  }

  private _updateVisuals(): void {
    const { min, max } = this.props;
    this._startPerc = (this._startValue - min!) / (max! - min!);
    this._endPerc = (this._endValue - min!) / (max! - min!);
    this._startDeadspaceRef.style.flexBasis = `${this._startPerc * 100}%`;
    this._endDeadspaceRef.style.flexBasis = `${(1 - this._endPerc) * 100}%`;
  }

  private _directInputHandler(e: Event): void {
    this._handleInput(e.target as HTMLInputElement);
  }

  private _onMouseDown(event: React.MouseEvent<HTMLElement>): void {
    const { min, max } = this.props;
    this._targetRect = (event.currentTarget as HTMLInputElement).getBoundingClientRect();
    this._mouseDownOrigin = { x: event.clientX, y: event.clientY };
    const perc = (event.clientX - this._targetRect.left) / this._targetRect.width;
    this._interactTarget = perc <= this._startPerc ? this._startRef : this._endRef;

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
      const { min, max } = this.props;
      const perc = (event.clientX - this._targetRect.left) / this._targetRect.width;
      const newValue = (max! - min!) * perc + min!;

      // only dispatch if we actually changed the value
      if (this._interactTarget.value !== String(newValue)) {
        // Event constructor supported so use it
        let syntheticEvent;
        if (typeof Event === 'function') {
          syntheticEvent = new Event('change');
        } else {
          syntheticEvent = document.createEvent('Event');
          // ie11 only supports change events on range input so use that
          syntheticEvent.initEvent('change', true, true);
        }
        this._interactTarget.value = String(newValue);
        this._interactTarget.dispatchEvent(syntheticEvent);
      }
    });
  }

  private _onMouseUp(event: MouseEvent): void {
    this._interactTarget.removeEventListener('change', this._directInputHandler);
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
    // re-enable transitions now that direct manipulation has ended
    this.setState({ enableTransitions: true });
  }
}

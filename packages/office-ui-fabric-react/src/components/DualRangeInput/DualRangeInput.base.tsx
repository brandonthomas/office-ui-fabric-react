import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';

const getClassNames = classNamesFunction<IDualRangeInputStyleProps, IDualRangeInputStyles>();

export class DualRangeInputBase extends BaseComponent<IDualRangeInputProps> {
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
  public constructor(props: IDualRangeInputProps) {
    super(props);
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
  }

  public render(): JSX.Element {
    const { styles, theme, className, min, max, startValue, endValue } = this.props;
    const classNames = getClassNames(styles, { theme: theme!, className });
    return (
      // on mouse down we'll detect the rect of each section
      // on mouse down/move we'll calculate the position within the range and apply it (without clamps)
      // _onInput will manage the clamping since we'll change the value and fire the change event
      // detect IE11 event support typeof window.Event === "function"
      // polyfill with OG way if it doesn't work
      <div className={classNames.root} onMouseDown={this._onMouseDown}>
        <div className={classNames.startDeadSpace} ref={this._setStartDeadspaceRef} />
        <div className={classNames.startContainer}>
          <input
            min={min}
            max={max}
            defaultValue={startValue!.toString()}
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
            min={min}
            max={max}
            defaultValue={endValue!.toString()}
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
        target.value = this._endValue.toString();
      }
      this._startValue = +target.value;
    }
    if (this._endRef === target) {
      if (+target.value < this._startValue) {
        target.value = this._startValue.toString();
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
    const rect = (event.currentTarget as HTMLInputElement).getBoundingClientRect();
    const perc = (event.clientX - rect.left) / rect.width;
    this._interactTarget = perc <= this._startPerc ? this._startRef : this._endRef;

    event.currentTarget.addEventListener('mousemove', this._onMouseMove);
    event.currentTarget.addEventListener('mouseup', this._onMouseUp);
    this._interactTarget.addEventListener('change', this._directInputHandler.bind(this));
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
    const { min, max } = this.props;
    const rect = (event.currentTarget as HTMLInputElement).getBoundingClientRect();
    const perc = (event.clientX - rect.left) / rect.width;

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

  private _onMouseUp(event: MouseEvent): void {
    this._interactTarget.removeEventListener('change', this._directInputHandler);
    event.currentTarget!.removeEventListener('mouseup', this._onMouseUp);
    event.currentTarget!.removeEventListener('mousemove', this._onMouseMove);
  }
}

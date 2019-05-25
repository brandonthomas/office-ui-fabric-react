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
      <div className={classNames.root} onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp}>
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
    const percStart = (this._startValue - min!) / (max! - min!);
    const percEnd = (this._endValue - min!) / (max! - min!);
    this._startDeadspaceRef.style.flexBasis = `${percStart * 100}%`;
    this._endDeadspaceRef.style.flexBasis = `${(1 - percEnd) * 100}%`;
  }

  private _directInputHandler(e: Event): void {
    this._handleInput(e.target as HTMLInputElement);
  }

  private _onMouseDown(event: React.MouseEvent<HTMLElement>): void {
    this._startRef.addEventListener('change', this._directInputHandler.bind(this));
    // Event constructor supported so use it
    let syntheticEvent;
    if (typeof Event === 'function') {
      syntheticEvent = new Event('change');
    } else {
      syntheticEvent = document.createEvent('Event');
      // ie11 only supports change events on range input so use that
      syntheticEvent.initEvent('change', true, true);
    }

    this._startRef.value = String(10);
    this._startRef.dispatchEvent(syntheticEvent);
  }

  private _onMouseUp(event: React.MouseEvent<HTMLElement>): void {
    this._startRef.removeEventListener('change', this._directInputHandler);
  }
}

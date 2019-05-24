import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyleProps, IDualRangeInputStyles, IDualRangeInputState } from './DualRangeInput.types';

const getClassNames = classNamesFunction<IDualRangeInputStyleProps, IDualRangeInputStyles>();

export class DualRangeInputBase extends BaseComponent<IDualRangeInputProps, IDualRangeInputState> {
  private _startRef: HTMLInputElement;
  private _endRef: HTMLInputElement;
  public constructor(props: IDualRangeInputProps) {
    super(props);
    const { startValue = 10, endValue = 80 } = props;
    this.state = {
      startValue: startValue,
      endValue: endValue
    };
    this._setStartRef = this._setStartRef.bind(this);
    this._setEndRef = this._setEndRef.bind(this);
    this._onInput = this._onInput.bind(this);
  }
  public render(): JSX.Element {
    const { styles, theme, className, min = 0, max = 100 } = this.props;
    const { startValue, endValue } = this.state;
    const classNames = getClassNames(styles, { theme: theme!, className });
    const percStart = (startValue - min) / (max - min);
    const percEnd = (endValue - min) / (max - min);
    return (
      // on mouse down we'll detect the rect of each section
      // on mouse down/move we'll calculate the position within the range and apply it (without clamps)
      // _onInput will manage the clamping since we'll change the value and fire the change event
      // detect IE11 event support typeof window.Event === "function"
      // polyfill with OG way if it doesn't work
      <div className={classNames.root}>
        <div className={classNames.startContainer}>
          <input
            min={min}
            max={max}
            defaultValue={startValue.toString()}
            type="range"
            className={classNames.startRange}
            onInput={this._onInput}
            onChange={this._onInput}
            ref={this._setStartRef}
          />
          <div className={classNames.startThumb}>{percStart}</div>
        </div>
        <div className={classNames.endContainer}>
          <input
            min={min}
            max={max}
            defaultValue={endValue.toString()}
            type="range"
            className={classNames.endRange}
            onInput={this._onInput}
            onChange={this._onInput}
            ref={this._setEndRef}
          />
          <div className={classNames.endThumb}>{percEnd}</div>
        </div>
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
    const target = event.target as HTMLInputElement;
    const { startValue, endValue } = this.state;
    const stateUpdated = () => {
      if (this.props.onInput) {
        this.props.onInput(this.state.startValue, this.state.endValue);
      }
    };
    if (this._startRef === target) {
      if (+target.value > endValue) {
        target.value = endValue.toString();
      }
      this.setState({ startValue: +target.value }, stateUpdated);
    }
    if (this._endRef === target) {
      if (+target.value < startValue) {
        target.value = startValue.toString();
      }
      this.setState({ endValue: +target.value }, stateUpdated);
    }
  }
}
/*
can test IE11 support typeof window.Event === 'function'

const div = document.getElementById("test");
const input = document.getElementById("input");

div.onmousedown = ()=> {
  // Create the event.
var event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('change', true, true);
  input.value = 10;
  input.dispatchEvent(event);
}
input.onchange = (thing)=>{
  console.log(typeof thing.target.value);
  if(thing.target.value < 20)
    {
      thing.target.value = 20;
    }
}*/

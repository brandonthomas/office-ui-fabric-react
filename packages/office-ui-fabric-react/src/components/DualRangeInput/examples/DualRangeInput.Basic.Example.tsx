import * as React from 'react';
import { DualRangeInput } from '../DualRangeInput';

export class DualRangeInputExample extends React.Component<
  {},
  { startValue: number; endValue: number; startDate?: string; endDate?: string }
> {
  private _today: number;
  private _startDate: number;
  private _startValue: number;
  constructor(props: {}) {
    super(props);
    this._onInput = this._onInput.bind(this);
    this.state = {
      startValue: 0,
      endValue: 100
    };
    let date = new Date();
    this._today = date.getTime();
    this._startDate = date.setDate(date.getDate() - 10);
    date = new Date();
    this._startValue = date.setDate(date.getDate() - 5);
  }
  public render(): JSX.Element {
    return (
      <div style={{ padding: 20 }}>
        <DualRangeInput
          onInput={this._onInput}
          min={this._startDate}
          max={this._today}
          startValue={this._startValue}
          endValue={this._today}
          step={86400000}
          startAriaLabel="Beginning of date range"
          startAriaValueText={this.state.startDate}
          endAriaValueText={this.state.endDate}
        />
        <DualRangeInput step={2} />
        <DualRangeInput step={12} min={-12} max={144} />
        <div style={{ backgroundColor: 'pink' }}>
          {this.state.startDate} || {this.state.endDate}
        </div>
      </div>
    );
  }

  private _onInput(startValue: number, endValue: number): void {
    this.setState({ startValue, endValue, startDate: new Date(startValue).toDateString(), endDate: new Date(endValue).toDateString() });
  }
}

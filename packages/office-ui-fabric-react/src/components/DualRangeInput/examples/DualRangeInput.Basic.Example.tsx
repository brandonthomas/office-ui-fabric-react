import * as React from 'react';
import { DualRangeInput } from '../DualRangeInput';

export class DualRangeInputExample extends React.Component<
  {},
  { startValue: number; endValue: number; startDate?: string; endDate?: string }
> {
  private _today: number;
  private _startDate: number;
  constructor(props: {}) {
    super(props);
    this._onChange = this._onChange.bind(this);
    let date = new Date();
    this._today = date.getTime();

    this.state = {
      startValue: date.setDate(new Date().getDate() - 5),
      endValue: new Date().getTime()
    };
    date = new Date();
    this._startDate = date.setDate(date.getDate() - 10);
  }
  public render(): JSX.Element {
    const { startValue, endValue } = this.state;
    return (
      <div style={{ padding: 20 }}>
        Controlled RangeSlider
        <DualRangeInput
          onChange={this._onChange}
          min={this._startDate}
          max={this._today}
          startValue={startValue}
          endValue={endValue}
          step={86400000}
          startAriaLabel="Ben's slider"
          startAriaValueText={this.state.startDate}
          endAriaValueText={this.state.endDate}
        />
        <div style={{ backgroundColor: 'pink' }}>
          {this.state.startDate} || {this.state.endDate}
        </div>
        Un-Controlled RangeSlider
        <DualRangeInput startAriaValueText={'small'} endAriaValueText={'large'} defaultStartValue={20} defaultEndValue={80} />
      </div>
    );
  }

  public componentDidMount(): void {
    const { startValue, endValue } = this.state;
    this.setState({ startDate: new Date(startValue).toDateString(), endDate: new Date(endValue).toDateString() });
  }

  private _onChange(startValue: number, endValue: number): void {
    this.setState({ startValue, endValue, startDate: new Date(startValue).toDateString(), endDate: new Date(endValue).toDateString() });
  }
}

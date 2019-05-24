import * as React from 'react';
import { DualRangeInput } from '../DualRangeInput';

export class DualRangeInputExample extends React.Component<{}, { startValue: number; endValue: number }> {
  constructor(props: {}) {
    super(props);
    this._onInput = this._onInput.bind(this);
    this.state = {
      startValue: 0,
      endValue: 100
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DualRangeInput onInput={this._onInput} min={0} max={100} />
        <div style={{ backgroundColor: 'pink' }}>
          {this.state.startValue} || {this.state.endValue}
        </div>
      </div>
    );
  }

  private _onInput(startValue: number, endValue: number): void {
    this.setState({ startValue, endValue });
  }
}

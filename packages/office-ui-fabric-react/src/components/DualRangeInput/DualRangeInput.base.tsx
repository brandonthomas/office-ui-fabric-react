import * as React from 'react';
import { BaseComponent } from '../../Utilities';

export interface IDualRangeInputProps {}
export class DualRangeInput extends BaseComponent<IDualRangeInputProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <input type="range" />
      </div>
    );
  }
}

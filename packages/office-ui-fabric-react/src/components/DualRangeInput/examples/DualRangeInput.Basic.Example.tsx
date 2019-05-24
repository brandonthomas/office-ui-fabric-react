import * as React from 'react';
import { DualRangeInput } from '../DualRangeInput';

export class DualRangeInputExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <DualRangeInput />
      </div>
    );
  }
}

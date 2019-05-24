import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';

const getClassNames = classNamesFunction<IDualRangeInputStyleProps, IDualRangeInputStyles>();

export class DualRangeInputBase extends BaseComponent<IDualRangeInputProps, {}> {
  public render(): JSX.Element {
    const { styles, theme, className } = this.props;
    const classNames = getClassNames(styles, { theme: theme!, className });
    return (
      <div className={classNames.root}>
        <div className={classNames.startContainer}>
          <input type="range" className={classNames.startRange} onInput={this._onStartInput} />
          <div className={classNames.startThumb} />
        </div>
        <div className={classNames.endContainer}>
          <input type="range" className={classNames.endRange} />
          <div className={classNames.endThumb} />
        </div>
      </div>
    );
  }

  private _onStartInput(event: React.FormEvent<HTMLInputElement>): void {
    console.log((event.target as HTMLInputElement).value);
  }
}

import { IStyle, ITheme } from '../../Styling';
import { IBaseProps, IStyleFunctionOrObject } from '../../Utilities';

export interface IDualRangeInputProps extends IBaseProps {
  min?: number;
  max?: number;
  startValue?: number;
  endValue?: number;
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IDualRangeInputStyleProps, IDualRangeInputStyles>;

  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;
  onInput?: (startValue: number, endValue: number) => void;
}

export interface IDualRangeInputState {
  startValue: number;
  endValue: number;
}

export interface IDualRangeInputStyles {
  root: IStyle;
  startContainer: IStyle;
  startRange: IStyle;
  startThumb: IStyle;
  endContainer: IStyle;
  endRange: IStyle;
  endThumb: IStyle;
}

export interface IDualRangeInputStyleProps {
  theme: ITheme;

  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;
}

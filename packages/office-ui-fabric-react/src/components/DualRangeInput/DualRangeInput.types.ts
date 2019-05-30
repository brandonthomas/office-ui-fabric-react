import { IStyle, ITheme } from '../../Styling';
import { IBaseProps, IStyleFunctionOrObject, IRenderFunction } from '../../Utilities';

export interface IDualRangeInputProps extends IBaseProps {
  min?: number;
  max?: number;
  startValue?: number;
  endValue?: number;
  defaultEndValue?: number;
  defaultStartValue?: number;
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IDualRangeInputStyleProps, IDualRangeInputStyles>;
  /**
   * aria label for the first thumb
   */
  startAriaLabel?: string;
  /**
   * aria label for the second thumb
   */
  endAriaLabel?: string;

  startAriaValueText?: string;

  endAriaValueText?: string;

  startAriaValueNow?: number;
  endAriaValueNow?: number;

  step?: number;

  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;
  /**
   * Callback that is triggered when the user is actively manipulating the slider
   */
  onInput?: (startValue: number, endValue: number) => void;

  onRenderTrack?: IRenderFunction<IDualRangeInputProps>;
  onRenderStartThumb?: IRenderFunction<IDualRangeInputProps>;
  onRenderEndThumb?: IRenderFunction<IDualRangeInputProps>;
}

export interface IDualRangeInputState {
  /**
   * state value to determine whether or not we display transitions
   * used to smooth mouse interactions
   */
  enableTransitions: boolean;

  startValue: number;
  endValue: number;
}

export interface IDualRangeInputStyles {
  root: IStyle;
  startDeadSpace: IStyle;
  startContainer: IStyle;
  startRange: IStyle;
  startThumb: IStyle;
  filler: IStyle;
  endContainer: IStyle;
  endRange: IStyle;
  endThumb: IStyle;
  endDeadSpace: IStyle;
}

export interface IDualRangeInputStyleProps {
  theme: ITheme;

  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;

  /**
   * value to determine whether or not we display transitions
   * used to smooth mouse interactions
   */
  enableTransitions: boolean;
}

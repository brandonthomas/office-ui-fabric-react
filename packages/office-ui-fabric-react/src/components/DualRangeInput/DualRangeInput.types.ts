import { IStyle, ITheme } from '../../Styling';
import { IBaseProps, IStyleFunctionOrObject, IRenderFunction } from '../../Utilities';

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

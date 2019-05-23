import { styled } from '../../Utilities';
import { IDualRangeInputProps, IDualRangeInputStyles, IDualRangeInputStyleProps } from './DualRangeInput.types';
import { DualRangeInputBase } from './DualRangeInput.base';
import { getDualRangeInputStyles } from './DualRangeInput.styles';

export const DualRangeInput: React.StatelessComponent<IDualRangeInputProps> = styled<
  IDualRangeInputProps,
  IDualRangeInputStyleProps,
  IDualRangeInputStyles
>(DualRangeInputBase, getDualRangeInputStyles);

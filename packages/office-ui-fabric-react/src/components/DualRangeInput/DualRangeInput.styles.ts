import { IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';
import { getFocusStyle } from '../../Styling';

export const getDualRangeInputStyles = (props: IDualRangeInputStyleProps): IDualRangeInputStyles => {
  const { theme, className } = props;
  return {
    root: [
      {},
      // class name should always be last
      className
    ],
    startRange: {
      position: 'absolute',
      opacity: 0,
      selectors: {
        '&:focus + $startThumb': { background: 'green' }
      }
    },
    endRange: {
      position: 'absolute',
      opacity: 0,
      selectors: {
        '&:focus + $endThumb': [getFocusStyle(theme), { background: 'transparent' }, { border: '1px solid black' }]
      }
    },
    startThumb: [getFocusStyle(theme), { width: 20, height: 20 }],
    endThumb: { width: 20, height: 20 }
  };
};

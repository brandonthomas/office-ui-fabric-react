import { IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';
import { getFocusStyle } from '../../Styling';

export const getDualRangeInputStyles = (props: IDualRangeInputStyleProps): IDualRangeInputStyles => {
  const { theme, className } = props;
  return {
    root: [
      { display: 'flex', position: 'relative' },
      // class name should always be last
      className
    ],
    startContainer: {},
    startRange: {
      position: 'absolute',
      left: 0,
      opacity: 0.2,
      selectors: {
        '&:focus + $startThumb': { background: 'green' }
      }
    },
    startThumb: [getFocusStyle(theme), { width: 20, height: 20 }],
    endContainer: {},
    endRange: {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      opacity: 0.2,
      selectors: {
        '&:focus + $endThumb': [getFocusStyle(theme), { background: 'transparent' }, { border: '1px solid black' }]
      }
    },
    endThumb: { width: 20, height: 20 }
  };
};

import { IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';
import { getFocusStyle } from '../../Styling';

export const getDualRangeInputStyles = (props: IDualRangeInputStyleProps): IDualRangeInputStyles => {
  const { theme, className } = props;
  return {
    root: [
      { display: 'flex' },
      // class name should always be last
      className
    ],
    startContainer: { position: 'relative' },
    startRange: {
      position: 'absolute',
      opacity: 0,
      selectors: {
        '&:focus + $startThumb': { background: 'green' }
      }
    },
    startThumb: [getFocusStyle(theme), { width: 20, height: 20 }],
    endContainer: { position: 'relative' },
    endRange: {
      position: 'absolute',
      opacity: 0,
      selectors: {
        '&:focus + $endThumb': [getFocusStyle(theme), { background: 'transparent' }, { border: '1px solid black' }]
      }
    },
    endThumb: { width: 20, height: 20 }
  };
};

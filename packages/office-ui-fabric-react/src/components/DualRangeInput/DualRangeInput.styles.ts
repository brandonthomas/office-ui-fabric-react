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
      pointerEvents: 'none',
      left: 0,
      opacity: 0.2,
      selectors: {
        '&:focus + $startThumb:after': { display: 'block' }
      }
    },
    startThumb: [getFocusStyle(theme, { isFocusedOnly: false }), { width: 20, height: 20, selectors: { '::after': { display: 'none' } } }],
    endContainer: {},
    endRange: {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      opacity: 0.2,
      selectors: {
        '&:focus + $endThumb:after': { display: 'block' }
      }
    },
    endThumb: [getFocusStyle(theme, { isFocusedOnly: false }), { width: 20, height: 20, selectors: { '::after': { display: 'none' } } }]
  };
};

import { IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';
import { getFocusStyle } from '../../Styling';

const sliderHeight = 4;

export const getDualRangeInputStyles = (props: IDualRangeInputStyleProps): IDualRangeInputStyles => {
  const { theme, className, enableTransitions } = props;
  return {
    root: [
      { display: 'flex', position: 'relative', height: 28, alignItems: 'center', userSelect: 'none' },
      // class name should always be last
      className
    ],
    startDeadSpace: {
      height: sliderHeight,
      backgroundColor: theme.palette.neutralTertiaryAlt,
      borderRadius: '4px 0px 0px 4px',
      ...(enableTransitions && { transition: 'flex-basis 500ms ease-in-out' })
    },
    startContainer: { height: sliderHeight, flex: '0 0 0px', maxWidth: 0 },
    startRange: {
      position: 'absolute',
      pointerEvents: 'none',
      height: 0,
      width: 0,
      opacity: 0,
      selectors: {
        '&:focus + $startThumb:after': { display: 'block' }
      }
    },
    startThumb: [
      getFocusStyle(theme, { isFocusedOnly: false }),
      {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.neutralSecondary,
        borderRadius: 10,
        boxSizing: 'border-box',
        background: theme.palette.white,
        display: 'block',
        width: 16,
        height: 16,
        transform: 'translate(-50%,-50%)',
        marginTop: 2,
        selectors: { '::after': { display: 'none' } }
      }
    ],
    filler: { height: sliderHeight, flex: '1 1 auto', backgroundColor: theme.palette.neutralSecondary },
    endContainer: { height: sliderHeight, flex: '0 0 0px', maxWidth: 0 },
    endRange: {
      position: 'absolute',
      pointerEvents: 'none',
      height: 0,
      width: 0,
      opacity: 0,
      selectors: {
        '&:focus + $endThumb:after': { display: 'block' }
      }
    },
    endThumb: [
      getFocusStyle(theme, { isFocusedOnly: false }),
      {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.neutralSecondary,
        borderRadius: 10,
        boxSizing: 'border-box',
        background: theme.palette.white,
        display: 'block',
        width: 16,
        height: 16,
        transform: 'translate(-50%,-50%)',
        marginTop: 2,
        selectors: { '::after': { display: 'none' } }
      }
    ],
    endDeadSpace: {
      height: sliderHeight,
      borderRadius: '0px 4px 4px 0px',
      backgroundColor: theme.palette.neutralTertiaryAlt,
      ...(enableTransitions && { transition: 'flex-basis 500ms ease-in-out' })
    }
  };
};

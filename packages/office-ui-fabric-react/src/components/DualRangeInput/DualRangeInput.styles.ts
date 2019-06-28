import { IDualRangeInputStyleProps, IDualRangeInputStyles } from './DualRangeInput.types';
import { getFocusStyle, IStyle } from '../../Styling';

const sliderHeight = 4;

export const getDualRangeInputStyles = (props: IDualRangeInputStyleProps): IDualRangeInputStyles => {
  const { theme, className, enableTransitions } = props;

  const thumbStyle: IStyle = [
    getFocusStyle(theme, { isFocusedOnly: false, inset: -4 }),
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
      selectors: {
        '::after': {
          display: 'none'
        },
        '*[dir="rtl"] &': {
          transform: 'translate(50%,-50%)'
        }
      }
    }
  ];
  const rangeStyle: IStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    height: 0,
    width: 0,
    opacity: 0
  };
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
    startRange: [
      rangeStyle,
      {
        selectors: {
          '&:focus + $startThumb:after': { display: 'block' }
        }
      }
    ],
    startThumb: thumbStyle,
    filler: { height: sliderHeight, flex: '1 1 auto', backgroundColor: theme.palette.neutralSecondary },
    endContainer: { height: sliderHeight, flex: '0 0 0px', maxWidth: 0 },
    endRange: [
      rangeStyle,
      {
        selectors: {
          '&:focus + $endThumb:after': { display: 'block' }
        }
      }
    ],
    endThumb: thumbStyle,
    endDeadSpace: {
      height: sliderHeight,
      borderRadius: '0px 4px 4px 0px',
      backgroundColor: theme.palette.neutralTertiaryAlt,
      ...(enableTransitions && { transition: 'flex-basis 500ms ease-in-out' })
    }
  };
};

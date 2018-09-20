/* tslint:disable */
import { IStyle, DefaultPalette, FontWeights, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavStyles } from './Nav.types';

export type INavItemStyle = {
  root?: IStyle;
  iconColumn?: IStyle;
  nameColumn?: IStyle;
};

export type IFloatingNavStyle = IStyle & {
  root?: IStyle;
  withChild?: IStyle;
};

const navFontSize = FontSizes.medium;
const navTextColor = DefaultPalette.black;
const navWidth = 280;
const navCollapsedWidth = 48;
const navItemHeight = 48;
const navBackgroundColor = '#E5E5E5';
const navDividerHeight = 21;
const navDividerColor = 'rgba(0,0,0,.2)';
const navItemSelectedColor = '#B7B7B7';
// Will need these later
// const navFloatingWidth = 230;
// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavStyleProps): INavStyles => {
  return {
    root: {
      width: navWidth,
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      transitionProperty: 'width',
      transitionDuration: '.3s',
      selectors: {
        ul: {
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          fontSize: navFontSize
        },
        a: {
          color: navTextColor,
          textDecoration: 'none',
          selectors: {
            ':focus': {
              backgroundColor: navItemSelectedColor
            }
          }
        }
      }
    },
    navCollapsed: {
      width: navCollapsedWidth
    },
    nestedNavLinkCollapsed: {
      display: 'none'
    },
    //
    // Everything below this needs to be brought above or deleted
    //
    navGroupDivider: {
      display: 'block',
      position: 'relative',
      height: navDividerHeight,
      textAlign: 'center',
      selectors: {
        '::after': {
          content: '" "',
          width: 'calc(100% - 32px)',
          position: 'absolute',
          height: '1px',
          top: 10,
          left: '16px',
          backgroundColor: navDividerColor
        }
      }
    },
    navGroupTitle: {
      lineHeight: navItemHeight,
      color: DefaultPalette.black,
      fontWeight: FontWeights.bold,
      marginLeft: '16px'
    }
  };
};

/* tslint:enable */

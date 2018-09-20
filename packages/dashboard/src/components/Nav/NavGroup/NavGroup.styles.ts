/* tslint:disable */
import { IStyle, DefaultPalette, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { INavGroupStyleProps, INavGroupStyles } from '../Nav.types';

export type INavItemStyle = {
  root?: IStyle;
  iconColumn?: IStyle;
  nameColumn?: IStyle;
};

export type IFloatingNavStyle = IStyle & {
  root?: IStyle;
  withChild?: IStyle;
};

const navItemHeight = 48;
const navDividerHeight = 21;
const navDividerColor = 'rgba(0,0,0,.2)';
// Will need these later
// const navFloatingWidth = 230;
// const BackDropSelector = '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';

export const getStyles = (props: INavGroupStyleProps): INavGroupStyles => {
  return {
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

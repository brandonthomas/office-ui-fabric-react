/* tslint:disable */
import { IStyle, DefaultPalette, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { INavStyleProps, INavLinkStyles } from '../Nav.types';

export type INavItemStyle = {
  root?: IStyle;
  iconColumn?: IStyle;
  nameColumn?: IStyle;
};

export type IFloatingNavStyle = IStyle & {
  root?: IStyle;
  withChild?: IStyle;
};

const navIconSize = FontSizes.icon;
const navItemHeight = 48;
const navChildItemHeight = 32;
const navItemHoverColor = '#CCCCCC';
const navItemWithChildBgColor = '#CCCCCC';
const navItemSelectedColor = '#B7B7B7';

export const getStyles = (props: INavStyleProps): INavLinkStyles => {
  const { isSelected, hasChildren, nestingLevel, isChildLinkSelected } = props;

  return {
    navItemRoot: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: hasChildren ? navItemWithChildBgColor : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navItemSmall: {
      height: navChildItemHeight,
      lineHeight: navChildItemHeight
    },
    nestedNavLink: {},
    nestedNavLinkCollapsed: {
      display: 'none'
    },
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      flex: isSelected || isChildLinkSelected ? '0 0 32px' : '0 0 48px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navItemBarMarker: {
      position: 'absolute',
      left: '4px',
      top: '12px',
      width: '2px',
      height: '24px',
      backgroundColor: DefaultPalette.accent
    },
    navItemBarMarkerSmall: {
      position: 'absolute',
      left: '41px',
      top: '7px',
      width: '2px',
      height: '18px',
      backgroundColor: DefaultPalette.accent
    },
    hidden: {
      display: 'none'
    },
    navItemIcon: {
      fontSize: navIconSize,
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      color: DefaultPalette.black
    },
    navItemText: {
      flex: '1 1 auto',
      lineHeight: !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      marginLeft: isChildLinkSelected || (!hasChildren && isSelected && !(nestingLevel && nestingLevel > 0)) ? '8px' : '0px',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      color: DefaultPalette.black
    }
  };
};

/* tslint:enable */

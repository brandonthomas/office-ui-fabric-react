/* tslint:disable */
import { INavLinkGroupStyleProps, INavLinkGroupStyes } from '../Nav.types';

export const getStyles = (props: INavLinkGroupStyleProps): INavLinkGroupStyes => {
  const { isExpanded } = props;
  return {
    nestedNavMenu: {
      display: isExpanded ? 'flex' : 'none'
    }
  };
};

/* tslint:enable */

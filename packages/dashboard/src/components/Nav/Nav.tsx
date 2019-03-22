import * as React from 'react';
import { INavLinkGroup, styled, classNamesFunction, BaseComponent, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';

import { INavProps, INavStyleProps, INavStyles, INavState } from './Nav.types';
import { getStyles } from './Nav.styles';
import { NavLink } from './NavLink';
import { NavGroup } from './NavGroup';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavComponent extends BaseComponent<INavProps, INavState> {
  private containerRef: React.RefObject<HTMLDivElement>;
  private fireCollapse: boolean = false;

  constructor(props: INavProps) {
    super(props);
    this.state = {
      isNavCollapsed: this.props.isNavCollapsed ? this.props.isNavCollapsed : false,
      shouldScroll: false
    };

    this.containerRef = React.createRef<HTMLDivElement>();
    this._onNavCollapseClicked = this._onNavCollapseClicked.bind(this);
    this._editClicked = this._editClicked.bind(this);
    this._toggleMore = this._toggleMore.bind(this);
    this._setScrollLayout = this._setScrollLayout.bind(this);
  }

  public render(): JSX.Element {
    const { groups, enableCustomization, showMore, editString, showMoreString, showLessString, dataHint, isNavCollapsed } = this.props;
    const { shouldScroll } = this.state;

    const navCollapsed = isNavCollapsed ? isNavCollapsed : this.state.isNavCollapsed;

    const classNames = getClassNames(getStyles, { isNavCollapsed: navCollapsed, shouldScroll });

    return (
      <FocusZone isCircularNavigation direction={FocusZoneDirection.vertical} className={classNames.root}>
        <div className={classNames.navWrapper}>
          <nav role="navigation" className={classNames.navContainer} ref={this.containerRef} aria-expanded={!navCollapsed}>
            <ul role="menubar" className={classNames.navGroup}>
              <li role="none" title={'NavToggle'}>
                {/** TODO convert this to an actual checkbox and hook into changed event instead */}
                <NavLink
                  onClick={this._onNavCollapseClicked}
                  data-hint={dataHint}
                  data-value={'NavToggle'}
                  aria-label="Navigation Collapse Toggle"
                  primaryIconName={'GlobalNavButton'}
                  role="switch"
                  aria-checked={navCollapsed}
                />
              </li>

              {groups.map((group: INavLinkGroup, groupIndex: number) => (
                <NavGroup
                  key={'group_' + groupIndex}
                  groupIndex={groupIndex}
                  groupName={group.name}
                  links={group.links}
                  dataHint={this.props.dataHint}
                  isNavCollapsed={navCollapsed}
                  onCollapse={this._setScrollLayout}
                  navRef={this.containerRef}
                />
              ))}

              {enableCustomization && (
                // If enableCustomization
                <>
                  <li role="none" title={'Edit navigation'}>
                    <NavLink
                      name={editString}
                      onClick={this._editClicked}
                      data-hint={'Edit navigation'}
                      data-value={'NavToggle'}
                      aria-label={'Edit navigation'}
                      primaryIconName={'Edit'}
                      role="menuitem"
                    />
                  </li>
                  {showMore && (
                    <li role="none" title={'Show more'}>
                      <NavLink
                        name={this.props.showMore ? showMoreString : showLessString}
                        onClick={this._toggleMore}
                        data-hint={'Show more'}
                        data-value={'Show more'}
                        aria-label={'Show more'}
                        primaryIconName={'More'}
                        role="menuitem"
                      />
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </FocusZone>
    );
  }

  // we also need to hook into a collapse callback for the nav items
  // also see if we can get rid of refs
  public componentDidMount(): void {
    this._setScrollLayout();
  }

  public componentDidUpdate(): void {
    if (this.fireCollapse) {
      this.fireCollapse = false;
      this._setScrollLayout();
    }
  }

  private _setScrollLayout(): void {
    const shouldScroll = !!this.containerRef.current && this.containerRef.current.scrollHeight > this.containerRef.current.clientHeight;
    this.setState({ shouldScroll });
  }

  //
  // Event handlers
  //
  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.fireCollapse = true;

    // inform the caller about the collapse event
    if (!!this.props.onNavCollapsedCallback) {
      this.props.onNavCollapsedCallback(!this.state.isNavCollapsed);
    }

    this.setState({
      isNavCollapsed: !this.state.isNavCollapsed
    });

    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _editClicked(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _toggleMore(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.props.onShowMoreLinkClicked) {
      this.props.onShowMoreLinkClicked(ev);
    }
  }
}

export const Nav = styled<INavProps, INavStyleProps, INavStyles>(NavComponent, getStyles);

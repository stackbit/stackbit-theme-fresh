import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';
import Icon from './Icon';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleWindowResize() {
        const menuOpenElm = _.get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('menu--opened');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('menu--opened');
    }

    handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('menu--opened');
    }

    renderNavLinks(navLinks, pageUrl) {
        return (
            <ul className="menu">
                {_.map(navLinks, (action, index) => {
                    const actionUrl = _.trim(_.get(action, 'url'), '/');
                    const actionStyle = _.get(action, 'style', 'link');
                    return (
                        <li
                            key={index}
                            className={classNames('menu-item', {
                                'current-menu-item': pageUrl === actionUrl,
                                'menu-button': actionStyle === 'button'
                            })}
                        >
                            <Action action={action} />
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderSocialLinks(socialLinks) {
        return (
            <div className="social-links">
                {_.map(socialLinks, (action, index) => {
                    const url = _.get(action, 'url');
                    const label = _.get(action, 'label');
                    const style = _.get(action, 'style', 'link');
                    const icon = _.get(action, 'icon_class', 'dev');
                    const classes = classNames({
                        'button': style === 'icon',
                        'button-icon': style === 'icon'
                    });
                    const newWindow = _.get(action, 'new_window');
                    const noFollow = _.get(action, 'no_follow');
                    const attrs = {};
                    if (newWindow) {
                        attrs.target = '_blank';
                    }
                    if (newWindow || noFollow) {
                        attrs.rel = [(newWindow ? 'noopener' : ''), (noFollow ? 'nofollow' : '')].filter(Boolean).join(' ');
                    }
                    return (
                        <Link key={index} href={withPrefix(url)} {...attrs} className={classes}>
                            {(style === 'icon' && icon) ? (
                                <React.Fragment>
                                    <Icon icon={icon} />
                                    <span className="screen-reader-text">{label}</span>
                                </React.Fragment>
                            ) :
                                label
                            }
                        </Link>
                    )
                })}
            </div>
        )
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageUrl = _.trim(getPageUrl(page), '/');
        const config = _.get(this.props, 'config');
        const header = _.get(config, 'header');
        const headerBackground = _.get(header, 'background', 'dark');
        const profileImg = _.get(header, 'profile_img');
        const profileImgAlt = _.get(header, 'profile_img_alt', '');
        const title = _.get(header, 'title');
        const tagline = _.get(header, 'tagline');
        const hasNav = _.get(header, 'has_nav');
        const navLinks = _.get(header, 'nav_links');
        const hasSocial = _.get(header, 'has_social');
        const socialLinks = _.get(header, 'social_links');

        return (
            <header id="masthead" className={`site-header ${headerBackground}`}>
                <div className="site-header-wrap">
                    <div className="site-header-inside">
                        <div className="site-branding">
                            {profileImg && (
                                <p className="profile">
                                    <Link href={withPrefix('/')}>
                                        <img src={withPrefix(profileImg)} className="avatar" alt={profileImgAlt} />
                                    </Link>
                                </p>
                            )}
                            <div className="site-identity">
                                <p className="site-title"><Link href={withPrefix('/')}>{title}</Link></p>
                                {tagline && <p className="site-description">{tagline}</p>}
                            </div>
                            {((hasNav && !_.isEmpty(navLinks)) || (hasSocial && !_.isEmpty(socialLinks))) && <button id="menu-toggle" className="menu-toggle" ref={this.menuOpenRef} onClick={this.handleMenuToggle.bind(this)}><span className="screen-reader-text">Menu</span><span className="icon-menu" aria-hidden="true" /></button>}
                        </div>
                        {((hasNav && !_.isEmpty(navLinks)) || (hasSocial && !_.isEmpty(socialLinks))) && (
                            <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                                <div className="site-nav-wrap">
                                    <div className="site-nav-inside">
                                        {hasNav && !_.isEmpty(navLinks) && this.renderNavLinks(navLinks, pageUrl)}
                                        {hasSocial && !_.isEmpty(socialLinks) && this.renderSocialLinks(socialLinks)}
                                    </div>
                                </div>
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

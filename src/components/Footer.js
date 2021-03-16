import React from 'react';
import _ from 'lodash';

import Action from './Action';
import { htmlToReact, Link } from '../utils';

export default class Footer extends React.Component {
    render() {
        const config = _.get(this.props, 'config');
        const footer = _.get(config, 'footer');
        const copyright = _.get(footer, 'content');
        const links = _.get(footer, 'links');

        return (
            <footer id="colophon" className="site-footer inner-sm">
                {(copyright || !_.isEmpty(links)) && (
                    <p className="site-info">
                        {copyright && (
                            <span className="copyright">{htmlToReact(copyright)}</span>
                        )}
                        {_.map(links, (action, index) => (
                            <Action key={index} action={action} />
                        ))}
                    </p>
                )}
                <Link id="to-top" className="to-top" href="#page">
                    <span className="icon-arrow-up" aria-hidden="true" />
                    <span className="screen-reader-text">Back to top</span>
                </Link>
            </footer>
        );
    }
}

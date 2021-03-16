import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { Link, getPageUrl, withPrefix } from '../utils';

export default class Blog extends React.Component {
    renderPost(post, index) {
        const title = _.get(post, 'title');
        const thumbImage = _.get(post, 'thumb_img_path');
        const thumbImageAlt = _.get(post, 'thumb_img_alt', '');
        const excerpt = _.get(post, 'excerpt');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postUrl = getPageUrl(post, { withPrefix: true });

        return (
            <article key={index} className="post post-card">
                <div className="post-inside">
                    {thumbImage && (
                        <Link className="post-thumbnail" href={postUrl}>
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </Link>
                    )}
                    <header className="post-header">
                        <h2 className="post-title">
                            <Link href={postUrl} rel="bookmark">{title}</Link>
                        </h2>
                    </header>
                    {excerpt && (
                        <div className="post-content">
                            <p>{excerpt}</p>
                        </div>
                    )}
                    <footer className="post-meta">
                        <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                    </footer>
                </div>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');

        return (
            <Layout page={page} config={config}>
                <header className="screen-reader-text">
                    <h1>{title}</h1>
                </header>
                <div className="post-feed">
                    <div className="post-feed-inside">
                        {_.map(posts, (post, index) => this.renderPost(post, index))}
                    </div>
                </div>
            </Layout>
        );
    }
}

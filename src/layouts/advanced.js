import React from 'react';
import _ from 'lodash';

import components, { Layout } from '../components/index';
import { getPageUrl } from '../utils';

export default class Advanced extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const posts = _.get(this.props, 'posts');
        const page = _.get(this.props, 'page');
        const hideTitle = _.get(page, 'hide_title');
        const title = _.get(page, 'title');
        const sections = _.get(page, 'sections');
        const pageUrl = getPageUrl(page);

        return (
            <Layout page={page} config={config}>
                {!hideTitle && (
                    <header className="post-header inner-sm">
                        <h1 className="post-title underline">{title}</h1>
                    </header>
                )}
                {_.map(sections, (section, index) => {
                    const sectionType = _.get(section, 'type');
                    const component = _.upperFirst(_.camelCase(sectionType));
                    if (!component) {
                        throw new Error(`page section does not have the 'type' property, page: ${pageUrl}`);
                    }
                    const Component = components[component];
                    if (!Component) {
                        throw new Error(`no component matching the page section's type: ${sectionType}`);
                    }
                    return <Component key={index} section={section} data={data} posts={posts} />;
                })}
            </Layout>
        );
    }
}

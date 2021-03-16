import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import FormField from './FormField';

export default class SectionForm extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');
        const formId = _.get(section, 'form_id');
        const formAction = _.get(section, 'form_action');
        const formFields = _.get(section, 'form_fields');
        const submitLabel = _.get(section, 'submit_label');
        const formHoneypotInputId = formId + '-honeypot';
        const formHoneypotLabelId = formId + '-honeypot-label';
        const formHoneypotName = formId + '-bot-field';

        return (
            <section id={sectionId} className="block block-form">
                {title && <h2 className="block-title underline inner-sm">{title}</h2>}
                <div className="block-content inner-sm">
                    {content && markdownify(content)}
                    <form
                        name={formId}
                        id={formId}
                        {...(formAction ? ({ action: formAction }) : null)}
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot={formHoneypotName}
                    >
                        <div className="screen-reader-text">
                            <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                                Don't fill this out if you're human: 
                                <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                            </label>
                        </div>
                        <input type="hidden" name="form-name" value={formId} />
                        {_.map(formFields, (field, index) => (
                            <FormField key={index} field={field} />
                        ))}
                        <div className="form-submit">
                            <button type="submit" className="button">{submitLabel}</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

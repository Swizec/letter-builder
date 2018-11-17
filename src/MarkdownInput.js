import React from "react";
import { Textarea, Heading } from "reactbulma";

import { Consumer } from "./Context";

export default () => (
    <Consumer>
        {({ markdown, onChangeMarkdown }) => (
            <React.Fragment>
                <Heading>Markdown</Heading>
                <Textarea onChange={onChangeMarkdown}>{markdown}</Textarea>
            </React.Fragment>
        )}
    </Consumer>
);

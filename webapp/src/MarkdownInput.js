import React from "react";
import { Textarea, Heading } from "reactbulma";

import { Consumer } from "./Context";

export default () => (
    <Consumer>
        {({ markdown, onChangeMarkdown }) => (
            <React.Fragment>
                <Heading>Markdown</Heading>
                <Textarea
                    onChange={onChangeMarkdown}
                    value={markdown}
                    style={{ height: "100%" }}
                />
            </React.Fragment>
        )}
    </Consumer>
);

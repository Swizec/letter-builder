import React from "react";
import { Textarea } from "reactbulma";

import { Consumer } from "./Context";

export default () => (
    <Consumer>
        {({ markdown, onChangeMarkdown }) => (
            <Textarea onChange={onChangeMarkdown}>{markdown}</Textarea>
        )}
    </Consumer>
);

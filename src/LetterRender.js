import React from "react";
import { Content, Heading } from "reactbulma";
import showdown from "showdown";
import "showdown-twitter";

import { Consumer } from "./Context";
import TwitterScreenshot from "./showdown/TwitterScreenshot";

export default () => {
    const converter = new showdown.Converter({
        extensions: ["twitter", TwitterScreenshot]
    });

    return (
        <Consumer>
            {({ markdown }) => (
                <React.Fragment>
                    <Heading>Rendered 💌</Heading>
                    <Content
                        dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(markdown)
                        }}
                    />
                </React.Fragment>
            )}
        </Consumer>
    );
};

import React from "react";
import { Content, Heading } from "reactbulma";
import showdown from "showdown";
import "showdown-twitter";

import { Consumer } from "./Context";

export default () => {
    const converter = new showdown.Converter({
        extensions: ["twitter"]
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

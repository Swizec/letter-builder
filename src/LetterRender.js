import React from "react";
import { Content, Heading } from "reactbulma";
import showdown from "showdown";
import "showdown-twitter";
import { Markdown } from "react-showdown";

import { Consumer } from "./Context";
import Screenshot from "./showdown/Screenshot";
import Image from "./showdown/Image";

export default () => {
    // const converter = new showdown.Converter({
    //     extensions: ["twitter", TwitterScreenshot]
    // });

    return (
        <Consumer>
            {({ markdown }) => (
                <React.Fragment>
                    <Heading>Rendered 💌</Heading>
                    <Content>
                        <Markdown
                            markup={markdown}
                            extensions={[
                                "twitter",
                                Screenshot.extension,
                                Image.extension
                            ]}
                            components={{
                                Screenshot: Screenshot.Component,
                                Image: Image.Component
                            }}
                        />
                    </Content>
                </React.Fragment>
            )}
        </Consumer>
    );
};

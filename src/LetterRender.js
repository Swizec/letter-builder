import React from "react";
import { Content, Heading } from "reactbulma";
import showdown from "showdown";
import "showdown-twitter";
import { Markdown } from "react-showdown";

import { Consumer } from "./Context";
import TwitterScreenshot from "./showdown/TwitterScreenshot";

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
                                TwitterScreenshot.extension
                            ]}
                            components={{
                                TwitterScreenshot: TwitterScreenshot.Component
                            }}
                        />
                    </Content>
                </React.Fragment>
            )}
        </Consumer>
    );
};

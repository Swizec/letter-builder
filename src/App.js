import React, { Component } from "react";
import { Section, Textarea } from "reactbulma";

import Copy from "./Copy";
import MarkdownInput from "./MarkdownInput";
import LetterRender from "./LetterRender";
import { Provider } from "./Context";

class App extends Component {
    state = {
        markdown: "",
        onChangeMarkdown: event =>
            this.setState({ markdown: event.target.value })
    };

    render() {
        return (
            <React.Fragment>
                <Copy.Hero />
                <Provider value={this.state}>
                    <Section style={{ display: "flex", paddingTop: 0 }}>
                        <Section style={{ flexGrow: 1 }}>
                            <MarkdownInput />
                        </Section>
                        <Section style={{ flexGrow: 1 }}>
                            <LetterRender />
                        </Section>
                    </Section>
                </Provider>
            </React.Fragment>
        );
    }
}

export default App;

import React, { Component } from "react";
import { Section, Textarea } from "reactbulma";

import Copy from "./Copy";
import MarkdownInput from "./MarkdownInput";
import LetterRender from "./LetterRender";
import { Provider } from "./Context";

import "./App.css";

class App extends Component {
    state = {
        markdown: "",
        onChangeMarkdown: event =>
            this.setState({ markdown: event.target.value })
    };

    render() {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "0.1fr 1.5fr 0.1fr",
                    gridTemplateAreas: "'.' '.' '.'"
                }}
            >
                <Copy.Hero />
                <Provider value={this.state}>
                    <Section
                        style={{ display: "flex", paddingTop: 0, flexGrow: 1 }}
                    >
                        <Section style={{ flexGrow: 1, width: "50%" }}>
                            <MarkdownInput />
                        </Section>
                        <Section style={{ flexGrow: 1, width: "50%" }}>
                            <LetterRender />
                        </Section>
                    </Section>
                </Provider>
                <Copy.Footer />
            </div>
        );
    }
}

export default App;

import React, { Component } from "react";
import { Section, Button } from "reactbulma";

import Copy from "./Copy";
import MarkdownInput from "./MarkdownInput";
import LetterRender from "./LetterRender";
import { Provider } from "./Context";

import "./App.css";

const exampleMarkdown = `# This is a magic newsletter input

Write markdown and a newsletter comes out. 🧙

## Images are optimized

![Woman holding glasses](https://images.unsplash.com/photo-1471017851983-fc49d89c57c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95bed2df50656fd7e4aa5924b250ff88&auto=format&fit=crop&w=2550&q=80)

## Tweets turn into screenshots

[https://twitter.com/Swizec/status/1063847466196328448]

## YouTube links become screenshots too

That way you can embed them in an email.

[https://www.youtube.com/watch?v=I_aTT6xxVL4]

## Even code blocks!

\`\`\`javascript
const a = 'Hello';
console.log(a, "World");
\`\`\`

`;

class App extends Component {
    state = {
        markdown: "",
        onChangeMarkdown: event =>
            this.setState({ markdown: event.target.value }),
        tryExample: event => this.setState({ markdown: exampleMarkdown })
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
                <Provider value={this.state}>
                    <Copy.Hero />
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

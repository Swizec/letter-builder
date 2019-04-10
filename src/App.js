import React, { Component } from "react";
import { Section } from "reactbulma";
import GitHub from "github-api";

import Copy from "./Copy";
import MarkdownInput from "./MarkdownInput";
import LetterRender from "./LetterRender";
import { Provider } from "./Context";
import ExportButton from "./ExportButton";

import "./App.css";

const exampleMarkdown = `# This is a magic newsletter input

Write markdown and a newsletter comes out. 🧙

## Images are optimized

![Woman holding glasses](https://images.unsplash.com/photo-1471017851983-fc49d89c57c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95bed2df50656fd7e4aa5924b250ff88&auto=format&fit=crop&w=2550&q=80)

All images are resized to 480px width and link to source. This ensures email clients display the full image and saves your readers' bandwidth.

Everything hosted on S3 for forever. Never lose an image again.

## Tweets turn into screenshots

https://twitter.com/Swizec/status/1063847466196328448

Thumbnails link to original tweets, but your readers can read them right in their email client. No more losing context.

## YouTube links become screenshots too

That way you can embed them in an email.

https://www.youtube.com/watch?v=I_aTT6xxVL4

## Even code blocks!

\`\`\`javascript
const screenshot = {
    type: "output",
    filter: function(text, _converter, _options) {
        return showdown.helper.replaceRecursiveRegExp(
            text,
            replacement,
            left,
            right,
            flags
        );
    }
};
\`\`\`

Screenshots are hard to copy pasta, so of course you get a copyable version when you click the image.

## You also get Instagram support

https://www.instagram.com/p/BvprE_AluFE/

## And of course CodeSandbox

https://codesandbox.io/s/llpk084r69
`;

class App extends Component {
    state = {
        markdown: "",
        onChangeMarkdown: event =>
            this.setState({ markdown: event.target.value }),
        tryExample: event => this.setState({ markdown: exampleMarkdown }),
        letterRef: React.createRef()
    };

    // Find way to sort returned repositories
    // Take the likeliest match, return link
    // Markdown syntax: gh:remarkjs
    // async componentDidMount() {
    //     const gh = new GitHub();
    //     const result = await gh
    //         .search({
    //             q: "remarkjs"
    //         })
    //         .forRepositories();
    //     console.log(result);
    // }

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
                        style={{
                            display: "flex",
                            paddingTop: 0,
                            flexGrow: 1
                        }}
                    >
                        <Section style={{ flexGrow: 1, width: "50%" }}>
                            <MarkdownInput />
                        </Section>
                        <Section style={{ flexGrow: 1, width: "50%" }}>
                            <LetterRender ref={this.state.letterRef} />
                            <ExportButton />
                        </Section>
                    </Section>
                </Provider>
                <Copy.Footer />
            </div>
        );
    }
}

export default App;

import React, { Component } from "react";
import { Section, Button } from "reactbulma";

import Copy from "./Copy";
import MarkdownInput from "./MarkdownInput";
import LetterRender from "./LetterRender";
import { Provider, Consumer } from "./Context";

import "./App.css";

const exampleMarkdown = `# This is a magic newsletter input

Write markdown and a newsletter comes out. 🧙

## Images are optimized

![Woman holding glasses](https://images.unsplash.com/photo-1471017851983-fc49d89c57c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95bed2df50656fd7e4aa5924b250ff88&auto=format&fit=crop&w=2550&q=80)

All images are resized to 480px width and link to source. This ensures email clients display the full image and saves your readers' bandwidth.

Everything hosted on S3 for forever. Never lose an image again.

## Tweets turn into screenshots

[https://twitter.com/Swizec/status/1063847466196328448]

Thumbnails link to original tweets, but your readers can read them right in their email client. No more losing context.

## YouTube links become screenshots too

That way you can embed them in an email.

[https://www.youtube.com/watch?v=I_aTT6xxVL4]

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
`;

// Borrowed from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyToClipboard = str => {
    const el = document.createElement("textarea"); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
    el.style.position = "absolute";
    el.style.left = "-9999px"; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0) // Store selection if found
            : false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
    }
};

class App extends Component {
    letterRef = React.createRef();

    state = {
        markdown: "",
        onChangeMarkdown: event =>
            this.setState({ markdown: event.target.value }),
        tryExample: event => this.setState({ markdown: exampleMarkdown }),
        exportLetter: event => {
            const { markdown } = this.state;

            if (markdown.length === 0) {
                alert("Nothing to export. Try writing a letter first");
            }

            const html = this.letterRef.current.querySelector(".content > div")
                .innerHTML;

            copyToClipboard(html);
            alert(
                "Letter copied to clipboard. Use Cmd+V in your favorite email sending app <span role='img' aria-label='face'>💌</span>"
            );
        }
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
                            <LetterRender ref={this.letterRef} />
                            <Consumer>
                                {({ exportLetter }) => (
                                    <Section
                                        style={{ textAlign: "right" }}
                                        medium
                                    >
                                        <Button
                                            large
                                            success
                                            onClick={exportLetter}
                                        >
                                            Export{" "}
                                            <span role="img" aria-label="face">
                                                📬
                                            </span>
                                        </Button>
                                    </Section>
                                )}
                            </Consumer>
                        </Section>
                    </Section>
                </Provider>
                <Copy.Footer />
            </div>
        );
    }
}

export default App;

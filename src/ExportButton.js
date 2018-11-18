import React from "react";
import { Section, Button } from "reactbulma";

import { Consumer } from "./Context";

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

export default class ExportButton extends React.Component {
    export = (markdown, letterRef) => {
        if (markdown.length === 0) {
            return alert("Nothing to export. Try writing a letter first");
        }

        const html = letterRef.current.querySelector(".content > div")
            .innerHTML;

        copyToClipboard(html);

        alert(
            "Letter copied to clipboard. Use Cmd+V in your favorite email sending app 💌"
        );
    };

    render() {
        return (
            <Consumer>
                {({ markdown, letterRef }) => (
                    <Section style={{ textAlign: "right" }} medium>
                        <Button
                            large
                            success
                            onClick={() => this.export(markdown, letterRef)}
                        >
                            Export{" "}
                            <span role="img" aria-label="face">
                                📬
                            </span>
                        </Button>
                    </Section>
                )}
            </Consumer>
        );
    }
}

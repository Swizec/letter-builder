import React from "react";
import ReactModal from "react-modal";
import { Title, SubTitle, Section, Button } from "reactbulma";

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
    state = {
        showModal: false
    };

    export = (markdown, letterRef) => {
        if (markdown.length === 0) {
            return alert("Nothing to export. Try writing a letter first");
        }

        const html = letterRef.current.querySelector(".content").innerHTML;

        copyToClipboard(html);

        this.setState({ showModal: true });
    };

    closeModal = () => {
        console.log("HELLO");
        this.setState({ showModal: false });
    };

    render() {
        const { showModal } = this.state;

        return (
            <div>
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
                <ReactModal
                    isOpen={showModal}
                    style={{
                        content: {
                            background: "rgb(241, 245, 248)",
                            maxWidth: 680,
                            margin: "0 auto"
                        }
                    }}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    shouldReturnFocusAfterClose={true}
                    onRequestClose={this.closeModal}
                >
                    <Section
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            background: "rgb(241, 245, 248)",
                            padding: 0,
                            height: "100%"
                        }}
                    >
                        <Section
                            style={{ paddingBottom: 25, textAlign: "center" }}
                        >
                            <Title>Letter copied to clipboard.</Title>
                            <SubTitle>
                                Use Cmd+V in your favorite email sending app 💌
                                <br />
                                <br />⏳ Saved some time? Consider supporting
                                this free tool 👇
                            </SubTitle>
                        </Section>
                        <iframe
                            src="https://checkoutpage.co/checkout/5bf1f1de674864001494c292/techletter-app--build-better-newsletters--"
                            style={{ flexGrow: 1 }}
                            title="Checkout page"
                        />
                    </Section>
                </ReactModal>
            </div>
        );
    }
}

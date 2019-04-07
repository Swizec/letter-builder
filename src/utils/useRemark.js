import { useState, useEffect } from "react";
import remark from "remark";
// import codeScreenshot from "remark-code-screenshot";
import remark2react from "remark-react";
import codeScreenshot from "./remarkCodeScreenshot";
import urlThumbnail from "./remarkUrlThumbnail";
import Screenshot from "../Screenshot";

// Why are screenshots not linked?
// How can we show loading for screenshots?
// Add back support for youtube, twitter, etc.

const screenshotHandler = (h, node) => {
    const props = { node };

    return h(node, "screenshot", props);
};

export const remarkCompile = input =>
    new Promise((resolve, reject) => {
        remark()
            .use(urlThumbnail, {
                domains: [
                    "m.twitter.com",
                    "twitter.com",
                    "youtube.com",
                    "youtu.be"
                ]
            })
            .use(codeScreenshot)
            .use(remark2react, {
                sanitize: false,
                remarkReactComponents: {
                    screenshot: Screenshot
                },
                toHast: {
                    handlers: {
                        screenshot: screenshotHandler
                    }
                }
            })
            .process(input, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
    });

export default function useRemark(input) {
    const [rendered, setRendered] = useState("");

    useEffect(() => {
        remarkCompile(input)
            .then(output => setRendered(output.contents))
            .catch(err => console.error(err));
    }, [input]);

    return rendered;
}

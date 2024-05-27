import React, { useState, useEffect } from "react";
import remark from "remark";
import remark2react from "remark-react";

import codeScreenshot from "./remarkCodeScreenshot";
import urlThumbnail from "./remarkUrlThumbnail";
import twitterUserLinks from "./remarkTwitterUserLinks";
import { remarkGiphySearch, GiphySearch } from "./remarkGiphySearch";
import Screenshot from "../Screenshot";

import { githubLinks, GithubLink } from "./remarkGithubLinks";
import { remarkNameOrFriend } from "./remarkNameOrFriend";
import { remarkSparkJoy } from "./remarkSparkJoy";

const customHandler = (type) => (h, node) => {
    const props = { node };

    return h(node, type, props);
};

export const remarkCompile = (input) =>
    new Promise((resolve, reject) => {
        remark()
            .use(urlThumbnail, {
                domains: [
                    "m.twitter.com",
                    "twitter.com",
                    "x.com",
                    "youtube.com",
                    "youtu.be",
                    "instagram.com",
                    "codesandbox.io",
                ],
            })
            .use(twitterUserLinks)
            .use(codeScreenshot)
            .use(githubLinks)
            .use(remarkGiphySearch)
            .use(remarkNameOrFriend)
            .use(remarkSparkJoy)
            .use(remark2react, {
                sanitize: false,
                remarkReactComponents: {
                    screenshot: Screenshot,
                    githubLink: GithubLink,
                    giphySearch: GiphySearch,
                    image: ({ node }) => (
                        <img
                            src={node.url}
                            alt={node.alt}
                            title={node.alt}
                            style={{ maxWidth: "600px" }}
                        />
                    ),
                },
                toHast: {
                    handlers: {
                        screenshot: customHandler("screenshot"),
                        githubLink: customHandler("githubLink"),
                        giphySearch: customHandler("giphySearch"),
                        image: customHandler("image"),
                    },
                },
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
            .then((output) => setRendered(output.contents))
            .catch((err) => console.error(err));
    }, [input]);

    return rendered;
}

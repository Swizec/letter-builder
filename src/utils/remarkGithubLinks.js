import React, { useState, useEffect } from "react";
import visit from "unist-util-visit";
import Octokit from "@octokit/rest";

const octokit = new Octokit({});

//[remark](gh:remarkjs/remark)

//[gatsby repo](gh:gatsby)

function githubLinks() {
    return tree =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];

            visit(tree, "link", node => {
                if (node.url.startsWith("gh:")) {
                    nodesToChange.push({
                        node
                    });
                }
            });

            for (const { node } of nodesToChange) {
                node.type = "githubLink";
            }

            resolve();
        });
}

const GithubLink = React.memo(
    ({ node }) => {
        const [url, setUrl] = useState(null);

        console.log("Rendering", node.url);

        useEffect(
            function() {
                (async function() {
                    const query = node.url.replace(/^gh:/, "");

                    const result = await octokit.search.repos({
                        q: query,
                        page: 1
                    });

                    const url = result.data.items.sort(
                        (a, b) => b.score - a.score
                    )[0].html_url;

                    setUrl(url);
                })();
            },
            [node]
        );

        return url ? (
            <a href={url}>{node.children[0].value}</a>
        ) : (
            <i>Searching {node.url}</i>
        );
    },
    (prevProps, nextProps) =>
        prevProps.node.url === nextProps.node.url &&
        prevProps.node.children[0].value === nextProps.node.children[0].value
);

export { githubLinks, GithubLink };

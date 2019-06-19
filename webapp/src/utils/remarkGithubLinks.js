import React, { useState, useEffect } from "react";
import visit from "unist-util-visit";
import Octokit from "@octokit/rest";

const octokit = new Octokit({});

let GithubCache = {};

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

        useEffect(
            function() {
                const query = node.url.replace(/^gh:/, "");

                if (GithubCache[query]) {
                    // Avoid making the same search multiple times
                    setUrl(GithubCache[query]);
                } else {
                    let retries = 0;
                    async function getUrl() {
                        try {
                            const result = await octokit.search.repos({
                                q: query,
                                page: 1
                            });

                            const url = result.data.items.sort(
                                (a, b) => b.score - a.score
                            )[0].html_url;

                            GithubCache[query] = url;

                            setUrl(url);
                        } catch (e) {
                            if (retries < 5) {
                                retries += 1;
                                setTimeout(getUrl, 5000);
                            }
                        }
                    }
                    getUrl();
                }
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

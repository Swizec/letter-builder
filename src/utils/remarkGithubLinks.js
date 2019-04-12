import React, { useState, useEffect } from "react";
import visit from "unist-util-visit";
import GitHub from "github-api";

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

const GithubLink = ({ node }) => {
    const [url, setUrl] = useState(null);

    useEffect(
        function() {
            (async function() {
                const gh = new GitHub();
                const query = node.url.replace(/^gh:/, "");
                const result = await gh
                    .search({
                        q: query
                    })
                    .forRepositories();

                const url = result.data.sort((a, b) => b.score - a.score)[0]
                    .html_url;

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
};

export { githubLinks, GithubLink };

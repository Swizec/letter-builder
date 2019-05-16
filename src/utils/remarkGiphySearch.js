import React, { useState, useEffect } from "react";
import visit from "unist-util-visit";

// ![](giphy:hello)

function remarkGiphySearch() {
    return tree =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];

            visit(tree, "image", node => {
                if (node.url.startsWith("giphy:")) {
                    nodesToChange.push({
                        node
                    });
                }
            });

            for (const { node } of nodesToChange) {
                node.type = "giphySearch";
                node.search = node.url.replace(/^giphy:/, "");
            }

            resolve();
        });
}

const GiphySearch = React.memo(({ node }) => {
    console.log(node);
    return null;
});

export { remarkGiphySearch, GiphySearch };

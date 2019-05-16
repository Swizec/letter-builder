import React, { useState, useEffect, useReducer } from "react";
import visit from "unist-util-visit";
import giphy from "giphy-api";

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

const GiphySearch = React.memo(
    ({ node }) => {
        const [{ image }, dispatch] = useReducer(
            function(state, action) {
                switch (action.type) {
                    case "foundGiphys":
                        return {
                            giphys: action.giphys,
                            index: 0,
                            image: action.giphys[0].images.downsized_medium.url
                        };
                    case "nextGiphy":
                        let index = (state.index + 1) % state.giphys.length;
                        return {
                            ...state,
                            index,
                            image:
                                state.giphys[index].images.downsized_medium.url
                        };
                    default:
                        throw new Error();
                }
            },
            {
                results: [],
                image: "/lg.pink-pig-ajax-loader.gif",
                index: 0
            }
        );

        useEffect(() => {
            (async () => {
                const results = await giphy(
                    "BbjXTpBIYN0GwoBCRpPLUCF08EPJ6PUp"
                ).search(node.search);

                dispatch({ type: "foundGiphys", giphys: results.data });
            })();
        }, [node.search]);

        return (
            <img
                src={image}
                style={{ maxWidth: 480 }}
                alt={`${node.search} giphy`}
                onClick={() => dispatch({ type: "nextGiphy" })}
            />
        );
    },
    (prevProps, nextProps) => prevProps.node.search === nextProps.node.search
);

export { remarkGiphySearch, GiphySearch };

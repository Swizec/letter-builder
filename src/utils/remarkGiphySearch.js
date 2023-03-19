import React, { useEffect, useReducer } from "react";
import visit from "unist-util-visit";
import giphy from "giphy-api";

import loaderImg from "../images/loader.gif";
import ReloadButton from "../ReloadButton";

// ![](giphy:hello)

// ![](giphy:rick_and_morty)

function remarkGiphySearch() {
    return (tree) =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];

            visit(tree, "image", (node) => {
                if (node.url.startsWith("giphy:")) {
                    nodesToChange.push({
                        node,
                    });
                }
            });

            for (const { node } of nodesToChange) {
                node.type = "giphySearch";
                node.search = node.url
                    .replace(/^giphy:/, "")
                    .replace(/_/g, " ");
            }

            resolve();
        });
}

function giphyReducer(state, action) {
    switch (action.type) {
        case "foundGiphys":
            return {
                giphys: action.giphys,
                index: 0,
                image: action.giphys[0].images.downsized_medium.url,
            };
        case "nextGiphy":
            let index = (state.index + 1) % state.giphys.length;
            return {
                ...state,
                index,
                image: state.giphys[index].images.downsized_medium.url,
            };
        default:
            throw new Error();
    }
}

const initialState = {
    results: [],
    image: loaderImg,
    index: 0,
};

const GiphySearch = React.memo(
    ({ node }) => {
        const [{ image }, dispatch] = useReducer(giphyReducer, initialState);

        useEffect(
            () => {
                (async () => {
                    const results = await giphy({
                        apiKey: process.env.REACT_APP_GIPHY_API_KEY,
                        https: true,
                    }).search(node.search);

                    dispatch({ type: "foundGiphys", giphys: results.data });
                })();
            },
            [node.search]
        );

        return (
            <>
                <img
                    src={image}
                    style={{ maxWidth: 480, cursor: "pointer" }}
                    alt={`${node.search} giphy`}
                />
                <ReloadButton onClick={() => dispatch({ type: "nextGiphy" })} />
            </>
        );
    },
    (prevProps, nextProps) => prevProps.node.search === nextProps.node.search
);

export { remarkGiphySearch, GiphySearch };

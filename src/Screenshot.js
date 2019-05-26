import React, { useState, useEffect } from "react";
import loaderImg from "./images/loader.gif";
import errorImg from "./images/error.png";

function Screenshot({ node }) {
    const [image, setImage] = useState(loaderImg);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(node.url),
                    url = await res.text();

                setImage(url);
            } catch (e) {
                setImage(errorImg);
            }
        })();
    }, [node]);

    return (
        <a href={node.link} target="_blank" rel="noopener noreferrer">
            <img
                src={image}
                style={{ maxWidth: 480 }}
                alt="Click through for source"
            />
        </a>
    );
}

export default Screenshot;

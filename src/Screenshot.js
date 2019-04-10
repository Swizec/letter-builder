import React, { useState, useEffect } from "react";
import { Base64 } from "js-base64";

// https://twitter.com/thepatwalls/status/1064024065961119745
// https://www.youtube.com/watch?v=pwkYP4iFt5Y

function Screenshot({ node }) {
    const [image, setImage] = useState("/lg.pink-pig-ajax-loader.gif");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(node.url),
                    url = await res.text();

                setImage(url);
            } catch (e) {
                setImage("/undraw_warning_cyit.png");
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

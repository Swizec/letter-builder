import React, { useState, useEffect } from "react";
import styled from "styled-components";

import loaderImg from "./images/loader.gif";
import errorImg from "./images/error.png";
import ReloadButton from "./ReloadButton";

const Div = styled.div`
    display: inline-block;
`;

function Screenshot({ node }) {
    const [image, setImage] = useState(loaderImg);

    const reloadImage = async () => {
        setImage(loaderImg);
        try {
            const res = await fetch(node.url),
                url = await res.text();

            setImage(url);
        } catch (e) {
            setImage(errorImg);
        }
    };

    useEffect(() => {
        reloadImage();
    }, [node]);

    return (
        <Div>
            <ReloadButton onClick={reloadImage} />
            <a href={node.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={image}
                    style={{ maxWidth: 480 }}
                    alt="Click through for source"
                />
            </a>
        </Div>
    );
}

export default Screenshot;

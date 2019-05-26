import React, { useState, useEffect } from "react";
import styled from "styled-components";

import loaderImg from "./images/loader.gif";
import errorImg from "./images/error.png";
import reloadImg from "./images/reload.png";

const Reload = styled.button`
    float: right;
    position: relative;
    left: -39px;
    background: url(${reloadImg});
    background-size: 39px 39px;
    width: 39px;
    height: 39px;
    border: 0px;
    cursor: pointer;
`;

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
            <Reload className="remove-me" onClick={reloadImage}>
                reload
            </Reload>
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

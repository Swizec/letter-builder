import React from "react";
import styled from "styled-components";

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

export default ({ onClick }) => (
    <Reload className="remove-me" onClick={onClick}>
        reload
    </Reload>
);

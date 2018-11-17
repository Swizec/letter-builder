import React from "react";
import { Content } from "reactbulma";

import { Consumer } from "./Context";

export default () => (
    <Consumer>{({ markdown }) => <Content>{markdown}</Content>}</Consumer>
);

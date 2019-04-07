import React, { useContext } from "react";
import { Content, Heading } from "reactbulma";

import MarkdownContext from "./Context";
import useRemark from "./utils/useRemark";

export default React.forwardRef((props, ref) => {
    const { markdown } = useContext(MarkdownContext);
    const rendered = useRemark(markdown);

    return (
        <div ref={ref}>
            <Heading>
                Rendered{" "}
                <span role="img" aria-label="face">
                    {" "}
                    💌
                </span>
            </Heading>
            <Content>{rendered}</Content>
        </div>
    );
});

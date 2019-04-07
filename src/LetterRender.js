import React, { useContext } from "react";
import { Content, Heading } from "reactbulma";
import "showdown-twitter";
import { Markdown } from "react-showdown";

import MarkdownContext from "./Context";
import useRemark from "./utils/useRemark";
// import Screenshot from "./showdown/Screenshot";
// import Image from "./showdown/Image";
// import Code from "./showdown/Code";

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
            <Content dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>
    );
});

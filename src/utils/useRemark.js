import { useState, useEffect } from "react";
import remark from "remark";
import html from "remark-html";
// import utf8 from "remark-utf8";
import codeScreenshot from "remark-code-screenshot";

export const remarkCompile = input =>
    new Promise((resolve, reject) => {
        remark()
            .use(codeScreenshot)
            .use(html)
            .process(input, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
    });

export default function useRemark(input) {
    const [rendered, setRendered] = useState("");

    useEffect(() => {
        remarkCompile(input)
            .then(output => setRendered(output.contents))
            .catch(err => console.error(err));
    }, [input]);

    return rendered;
}

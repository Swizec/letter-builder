import visit from "unist-util-visit";

// copied from https://github.com/Swizec/remark-code-screenshot/blob/master/src/index.js

function getScreenshotUrl(src, codeType = "javascript") {
    return `https://pifc233qp6.execute-api.us-east-1.amazonaws.com/dev/screenshot?type=code&code=${encodeURIComponent(
        src
    )}&codeType=${codeType}&urlencoded=true`;
}

function getSourceLink(src, codeType = "javascript") {
    return `https://carbon.now.sh/?bg=rgba(255,255,255,1)&t=seti&l=${codeType}&ds=true&wc=true&wa=true&pv=48px&ph=32px&ln=false&code=${encodeURIComponent(
        src
    )}`;
}

function codeScreenshot() {
    return tree =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];
            visit(tree, "code", node => {
                nodesToChange.push({
                    node
                });
            });
            for (const { node } of nodesToChange) {
                node.type = "screenshot";
                node.url = getScreenshotUrl(node.value, node.lang);
                node.link = getSourceLink(node.value, node.lang);
            }

            resolve();
        });
}

export default codeScreenshot;

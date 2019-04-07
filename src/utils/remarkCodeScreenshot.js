import visit from "unist-util-visit";

// copied from https://github.com/Swizec/remark-code-screenshot/blob/master/src/index.js

async function getCodeScreenshot(src) {
    const codeType = "javascript",
        srcArg = btoa(src);

    const res = await fetch(
        `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?type=code&code=${srcArg}&codeType=${codeType}`
    );

    return res.text();
}

function getScreenshotUrl(src) {
    const codeType = "javascript",
        srcArg = btoa(src);

    return `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?type=code&code=${srcArg}&codeType=${codeType}`;
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
                node.url = getScreenshotUrl(node.value);
            }

            resolve();
        });
}

export default codeScreenshot;

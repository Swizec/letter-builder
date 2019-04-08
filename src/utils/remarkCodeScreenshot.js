import visit from "unist-util-visit";
import { Base64 } from "js-base64";

// copied from https://github.com/Swizec/remark-code-screenshot/blob/master/src/index.js

function getScreenshotUrl(src, codeType = "javascript") {
    const srcArg = Base64.encode(src);

    return `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?type=code&code=${srcArg}&codeType=${codeType}`;
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

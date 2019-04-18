import visit from "unist-util-visit";
import Url from "url-parse";

function getScreenshotUrl(url) {
    return `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?url=${url}`;
}

function remarkUrlThumbnail({ domains = [] }) {
    return tree =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];
            visit(tree, "link", node => {
                const url = new Url(node.url);
                const thumbnailable = domains.some(
                    d => url.hostname.replace("www.", "") === d
                );
                const rawLink = node.children[0].value === node.url;

                if (thumbnailable && rawLink) {
                    nodesToChange.push({
                        node
                    });
                }
            });
            for (const { node } of nodesToChange) {
                node.type = "screenshot";
                node.url = getScreenshotUrl(node.url);
                node.link = node.url;
            }

            resolve();
        });
}

export default remarkUrlThumbnail;

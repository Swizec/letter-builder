import visit from "unist-util-visit";
import Url from "url-parse";

function getScreenshotUrl(url) {
    return `https://mskj2vd0r9.execute-api.us-east-1.amazonaws.com/dev2/embed?url=${url}`;
}

function remarkUrlThumbnail({ domains = [] }) {
    return (tree) =>
        new Promise(async (resolve, reject) => {
            const nodesToChange = [];
            visit(tree, "link", (node) => {
                const url = new Url(node.url);
                const thumbnailable = domains.some(
                    (d) => url.hostname.replace("www.", "") === d
                );
                const rawLink = node.children[0].value === node.url;

                if (thumbnailable && rawLink) {
                    nodesToChange.push({
                        node,
                    });
                }
            });
            for (const { node } of nodesToChange) {
                node.type = "screenshot";
                node.link = node.url;
                node.url = getScreenshotUrl(node.url);
            }

            resolve();
        });
}

export default remarkUrlThumbnail;

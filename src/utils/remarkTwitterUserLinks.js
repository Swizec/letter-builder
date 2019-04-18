import visit from "unist-util-visit-parents";
import u from "unist-builder";

const UserRegex = new RegExp(/@(\w+)/, "g");

function* getUsernames(string) {
    let match = null;

    do {
        match = UserRegex.exec(string);
        if (match) {
            yield match;
        }
    } while (match);
}

// replace last child of parent with subtree including a link
function linkUsername({ username, parent }) {
    const [raw, clean] = username;
    const [before, after] = parent.children[
        parent.children.length - 1
    ].value.split(raw);

    const children = [
        u("text", { value: before }),
        u("link", { url: `https://twitter.com/${clean}` }, [
            u("text", { value: raw })
        ]),
        u("text", { value: after })
    ];

    parent.children.splice(-1, 1, children);
    parent.children = parent.children.flat();

    return parent;
}

function twitterUserLinks() {
    return tree =>
        new Promise((resolve, reject) => {
            // find text nodes
            // direct descendants of paragraph
            // locate @username
            // split it into a link node

            visit(tree, "text", (node, parents) => {
                let [parent] = parents.slice(-1);

                if (
                    node.value.indexOf("@") >= 0 &&
                    parent.type === "paragraph"
                ) {
                    const oldValue = node.value;

                    for (const username of getUsernames(oldValue)) {
                        parent = linkUsername({
                            username,
                            parent
                        });
                    }
                }
            });

            resolve();
        });
}

export default twitterUserLinks;

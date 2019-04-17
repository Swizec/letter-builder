import visit from "unist-util-visit-parents";

const UserRegex = new RegExp(/@(\w+)/, "g");

function* getUsernames(string) {
    let match = null;

    do {
        match = UserRegex.exec(string);
        yield match;
    } while (match);
}

function twitterUserLinks() {
    return tree =>
        new Promise((resolve, reject) => {
            // find text nodes
            // direct descendants of paragraph
            // locate @username
            // split it into a link node

            /// Note for tomorrow:
            // Figure out how to split paragraph into multiple children
            // change needle string into link node

            visit(tree, "text", (node, parents) => {
                const [parent] = parents.slice(-1);
                console.log("candidate?", { node, parent });

                if (
                    node.value.indexOf("@") >= 0 &&
                    parent.type === "paragraph"
                ) {
                    console.log("changing stuff!");

                    const oldValue = node.value;

                    for (const username of getUsernames(oldValue)) {
                        if (username) {
                            console.log(username);

                            const [raw, clean] = username;
                            node.value = node.value.replace(
                                raw,
                                `https://twitter.com/${clean}`
                            );

                            parent.children.push({
                                type: "link",
                                url: `https://twitter.com/${clean}`,
                                children: [
                                    {
                                        text: raw
                                    }
                                ]
                            });

                            console.log(node.children);
                        }
                    }
                }
            });

            console.log(tree);

            resolve();
        });
}

export default twitterUserLinks;

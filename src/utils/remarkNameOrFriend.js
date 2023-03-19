import visit from "unist-util-visit";

const nameOrFriend = /^\s*name\s*\|(.*)$/;

export function remarkNameOrFriend() {
    return (tree) => {
        visit(tree, "linkReference", (node, index, parent) => {
            if (node.label.match(nameOrFriend)) {
                node.type = "text";

                node.value = node.label.replace(
                    nameOrFriend,
                    '{% if subscriber.first_name != blank %}{{ subscriber.first_name | truncatewords: 1, "" | capitalize }}{% else %}$1{% endif %}'
                );
                node.children = null;
            }
        });
    };
}

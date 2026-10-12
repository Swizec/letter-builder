import visit from "unist-util-visit";

const sparkjoy = /^\s*sparkjoy\s*\|(.*)$/;

export function remarkSparkJoy() {
    return (tree) => {
        visit(tree, "linkReference", (node, index, parent) => {
            const match = node.label.match(sparkjoy);
            if (match) {
                const articleUrl = `https://swizec.com/blog/${encodeURIComponent(match[1].trim())}/`;
                node.type = "text";
                node.value = `<div class="Widget__WidgetLayout-sc-1ityn2x-2 cJHITu">
	<h2 class="styles__Heading-sc-1lygi1f-1 Widget__Question-sc-1ityn2x-3 haLIoK" style="text-align: center;">Did you enjoy this email?</h2>
	<div class="styles__Flex-sc-1lygi1f-2 biiuQx" style="text-align: center;">
		<a href="${articleUrl}?vote=thumbsdown&email={{ subscriber.email_address | url_encode }}" class="Widget__RoundButton-sc-1ityn2x-1 caphDb" style="background-color: transparent;border-radius:100%;font-size: 2.25rem;line-height: 2.25rem;width: 2em;height: 2em;cursor: pointer;font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-style: normal;font-weight: 400;letter-spacing: normal;text-align: start;text-indent: 0px;white-space: normal;">👎</a><a href="${articleUrl}?vote=thumbsup&email={{ subscriber.email_address | url_encode }}" class="Widget__RoundButton-sc-1ityn2x-1 caphDb" style="background-color: transparent;border-radius:100%;font-size: 2.25rem;line-height: 2.25rem;width: 2em;height: 2em;cursor: pointer;font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-style: normal;font-weight: 400;letter-spacing: normal;text-align: start;text-indent: 0px;white-space: normal;">👍</a>
	</div>
</div>`;
                node.children = null;

                console.log(node);
            }
        });
    };
}

import visit from "unist-util-visit";

const sparkjoy = /^\s*sparkjoy\s*\|(.*)$/;

export function remarkSparkJoy() {
    return (tree) => {
        visit(tree, "linkReference", (node, index, parent) => {
            if (node.label.match(sparkjoy)) {
                node.type = "text";
                node.value = node.label.replace(
                    sparkjoy,
                    `<div class="Widget__WidgetLayout-sc-1ityn2x-2 cJHITu">
	<h2 class="styles__Heading-sc-1lygi1f-1 Widget__Question-sc-1ityn2x-3 haLIoK" style="text-align: center;">Did you enjoy this email?</h2>
	<div class="styles__Flex-sc-1lygi1f-2 biiuQx" style="text-align: center;">
		<a href="https://spark-joy.netlify.app/1b23e2b6-1c2a-49a2-b3ee-69bb26c125e9/thumbsdown?voter={{ subscriber.email_address }}&instanceOfJoy=$1" class="Widget__RoundButton-sc-1ityn2x-1 caphDb" style="background-color: transparent;border-radius:100%;font-size: 2.25rem;line-height: 2.25rem;width: 2em;height: 2em;cursor: pointer;font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-style: normal;font-weight: 400;letter-spacing: normal;text-align: start;text-indent: 0px;white-space: normal;">👎</a><a href="https://spark-joy.netlify.app/1b23e2b6-1c2a-49a2-b3ee-69bb26c125e9/thumbsup?voter={{ subscriber.email_address }}&instanceOfJoy=$1" class="Widget__RoundButton-sc-1ityn2x-1 caphDb" style="background-color: transparent;border-radius:100%;font-size: 2.25rem;line-height: 2.25rem;width: 2em;height: 2em;cursor: pointer;font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-style: normal;font-weight: 400;letter-spacing: normal;text-align: start;text-indent: 0px;white-space: normal;">👍</a>
	</div>
</div>`
                );
                node.children = null;

                console.log(node);
            }
        });
    };
}

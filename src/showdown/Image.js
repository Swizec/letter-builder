import React from "react";

// https://twitter.com/thepatwalls/status/1064024065961119745
// https://www.youtube.com/watch?v=pwkYP4iFt5Y

export const extension = function() {
    const screenshot = {
        type: "lang",
        regex: /\!\[(.*)\]\((http(s){0,1}:\/\/(.+))\)/g,
        replace: function(match, caption, url) {
            return `<Image src="${url}" caption="${caption}" />`;
        }
    };

    return [screenshot];
};

export class Component extends React.Component {
    state = {
        image: "/lg.pink-pig-ajax-loader.gif"
    };

    async componentDidMount() {
        const { src } = this.props;
        const tmp = new URL(src);

        if (
            tmp.pathname
                .split(".")
                .pop()
                .toLowerCase() === "gif"
        ) {
            this.setState({ image: src });
        } else {
            try {
                const res = await fetch(
                        `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?type=image&url=${src}`
                    ),
                    url = await res.text();

                this.setState({ image: url });
            } catch (e) {
                this.setState({ image: "/undraw_warning_cyit.png" });
            }
        }
    }

    render() {
        const { image } = this.state,
            { src, caption } = this.props;

        return (
            <a href={src} target="_blank" rel="noopener noreferrer">
                <img src={image} style={{ maxWidth: 480 }} alt={caption} />
                <br />
                {caption}
            </a>
        );
    }
}

export default { extension, Component };

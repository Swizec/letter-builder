import React from "react";

// https://twitter.com/thepatwalls/status/1064024065961119745
// https://www.youtube.com/watch?v=pwkYP4iFt5Y

export const extension = function() {
    const screenshot = {
        type: "lang",
        regex: /\[((http|https):\/\/(www.){0,1}(twitter.com|youtube.com|youtu.be)\/(.+))\]/g,
        replace: function(match, url) {
            return `<Screenshot src="${url}" />`;
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

        try {
            const res = await fetch(
                    `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?url=${src}`
                ),
                url = await res.text();

            this.setState({ image: url });
        } catch (e) {
            this.setState({ image: "/undraw_warning_cyit.png" });
        }
    }

    render() {
        const { image } = this.state,
            { src } = this.props;

        return (
            <a href={src} target="_blank" rel="noopener noreferrer">
                <img src={image} style={{ maxWidth: 480 }} alt={src} />
            </a>
        );
    }
}

export default { extension, Component };

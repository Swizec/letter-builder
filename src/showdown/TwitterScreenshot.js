import React from "react";

export const extension = function() {
    const twitter = {
        type: "lang",
        regex: /\[((http|https):\/\/(www){0,1}twitter.com\/(.+))\]/,
        replace: function(match, url) {
            return `<TwitterScreenshot tweet="${url}" />`;
        }
    };

    return [twitter];
};

export class Component extends React.Component {
    state = {
        image: "/lg.pink-pig-ajax-loader.gif"
    };

    async componentDidMount() {
        const { tweet } = this.props;

        const res = await fetch(
                `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?url=${tweet}`
            ),
            url = await res.text();

        this.setState({ image: url });
    }

    render() {
        const { image } = this.state,
            { tweet } = this.props;

        return (
            <a href={tweet} target="_blank" rel="noopener noreferrer">
                <img
                    src={image}
                    style={{ maxWidth: 480 }}
                    alt={`Tweet from ${tweet}`}
                />
            </a>
        );
    }
}

export default { extension, Component };

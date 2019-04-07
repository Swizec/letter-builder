import React from "react";

// https://twitter.com/thepatwalls/status/1064024065961119745
// https://www.youtube.com/watch?v=pwkYP4iFt5Y

export class Component extends React.Component {
    state = {
        image: "/lg.pink-pig-ajax-loader.gif"
    };

    async componentDidMount() {
        const { node } = this.props;

        try {
            const res = await fetch(node.url),
                url = await res.text();

            this.setState({ image: url });
        } catch (e) {
            this.setState({ image: "/undraw_warning_cyit.png" });
        }
    }

    render() {
        const { image } = this.state,
            { node } = this.props;

        return (
            <a href={image} target="_blank" rel="noopener noreferrer">
                <img src={image} style={{ maxWidth: 480 }} alt={node.value} />
            </a>
        );
    }
}

export default Component;

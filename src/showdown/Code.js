import React from "react";
import showdown from "showdown";
import { Base64 } from "js-base64";

// https://twitter.com/thepatwalls/status/1064024065961119745
// https://www.youtube.com/watch?v=pwkYP4iFt5Y

export const extension = function() {
    // const screenshot = {
    //     type: "lang",
    //     regex: /`(.+)`/g,
    //     replace: function(match, code) {
    //         return `<Code src="${code}" codeType="js" />`;
    //     }
    // };

    function htmlunencode(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    const left = "<pre><code\\b[^>]*>";
    const right = "</code></pre>";
    const flags = "g";

    function replacement(_wholeMatch, match, left, right) {
        let lang = _wholeMatch.match(/language-(\w+)/);
        lang = lang ? lang[1] : "javascript";

        if (!match || !left || !right) {
            return _wholeMatch;
        }

        match = htmlunencode(match);
        return `<Code src="${Base64.encodeURI(match)}" codeType="${lang}" />`;
    }

    const screenshot = {
        type: "output",
        filter: function(text, _converter, _options) {
            return showdown.helper.replaceRecursiveRegExp(
                text,
                replacement,
                left,
                right,
                flags
            );
        }
    };

    return [screenshot];
};

export class Component extends React.Component {
    state = {
        image: "/lg.pink-pig-ajax-loader.gif"
    };

    async componentDidMount() {
        const { src, codeType } = this.props;

        try {
            const res = await fetch(
                    `https://84wz7ux5rc.execute-api.us-east-1.amazonaws.com/default/screenshot-as-a-service-dev-screenshot-function?type=code&code=${src}&codeType=${codeType}`
                ),
                url = await res.text();

            this.setState({ image: url });
        } catch (e) {
            this.setState({ image: "/undraw_warning_cyit.png" });
        }
    }

    get url() {
        const { src, codeType } = this.props;

        return `https://carbon.now.sh/?bg=rgba(255,255,255,1)&t=seti&l=${codeType}&ds=true&wc=true&wa=true&pv=48px&ph=32px&ln=false&code=${encodeURIComponent(
            Base64.decode(src)
        )}`;
    }

    render() {
        const { image } = this.state,
            { caption } = this.props;

        return (
            <a href={this.url} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={caption} />
            </a>
        );
    }
}

export default { extension, Component };

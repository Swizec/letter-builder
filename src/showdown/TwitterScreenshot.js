export default function() {
    const twitter = {
        type: "lang",
        regex: /\[((http|https):\/\/(www){0,1}twitter.com\/(.+))\]/,
        replace: function(match, url) {
            return `[![](https://media.giphy.com/media/k5lsGnQMi1HVFMNrOF/giphy.gif)](${url})`;
        }
    };

    return [twitter];
}

//
// [https://twitter.com/Swizec/status/1063925383085547520]

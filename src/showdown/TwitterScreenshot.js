export default function() {
    const twitter = {
        type: "lang",
        regex: /\[(http|https):\/\/(www){0,1}twitter.com\/(.+)\]/,
        replace: "Hello Tweet"
    };

    return [twitter];
}

//
// [https://twitter.com/Swizec/status/1063925383085547520]

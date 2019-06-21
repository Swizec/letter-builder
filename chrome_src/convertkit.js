import React from 'react'

setTimeout(() => {
    const editor = document.getElementsByClassName("redactor-box")[0];

    const targetNode = document.createElement("div");

    editor.parentNode.insertBefore(targetNode, editor);

    targetNode.innerHTML = `<img src="https://media.giphy.com/media/WUq1cg9K7uzHa/giphy.gif" />`;
}, 1000);
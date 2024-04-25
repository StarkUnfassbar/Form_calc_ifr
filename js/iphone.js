if(/iPhone/i.test(navigator.userAgent)){
    document.querySelector("head").insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" href="css/iphone.css">
    `);
}
const typeWriterElements = document.getElementsByClassName("span-text");
for (let i = 0; i < typeWriterElements.length; i++) {
    var tl = new TimelineMax({
        paused: true
    });
    const elementID = typeWriterElements[i].id;
    const e=document.getElementById(elementID);

    // letter animation
    tl.fromTo("#" + elementID, 0.5, {
        "display": "none"
    }, {
        "display": "block",
        delay: i * 3,
    })
    tl.fromTo("#" + elementID, 3, {
        width: "0",
    }, {
        width: "100%", /* same as CSS .line-1 width */
        ease: SteppedEase.config(24),
        delay: i * 3,
        onComplete: myFunc,
        onCompleteParams: [elementID, i, tl]
    }, 0);
    // text cursor animation
    tl.fromTo("#" + elementID, 0.5, {
        "border-right-color": "rgba(255,255,255,0.75)"
    }, {
        "border-right-color": "rgba(255,255,255,0)",
        repeat: -1,
        ease: SteppedEase.config(15)
    }, 0);

    tl.play();
}
function myFunc(EID, index, timeLine) {
    let e = document.getElementById(EID);
    e.style.border = "none";
    timeLine.kill("#" + EID)
}


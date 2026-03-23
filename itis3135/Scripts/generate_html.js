document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("generate-html");
    if (!button) {
        return;
    }

    button.addEventListener("click", () => {
        if (window.IntroFormApp) {
            window.IntroFormApp.handleGenerateHtml();
        }
    });
});
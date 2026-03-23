document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("generate-json");
    if (!button) {
        return;
    }

    button.addEventListener("click", () => {
        if (window.IntroFormApp) {
            window.IntroFormApp.handleGenerateJson();
        }
    });
});
$(document).ready(() => {
// Declare your advice counter in this scope
let adviceCount = 0;
function getAdvice() {
    // Make your AJAX request here
    $(document).load(`https://api.adviceslip.com/advice/${Math.ceil(Math.random() * 200)}`, (response) => {
        $("#advice").text(JSON.parse(response).slip.advice);
        adviceCount++;
        $("#adviceCount").text(adviceCount);
        if (adviceCount === 1) {
            $("#pluralizer").hide();
        }
        else {
            $("#pluralizer").show();
        }
    });
}
$("#advice-button").on("click", () => {
    getAdvice();
});
});

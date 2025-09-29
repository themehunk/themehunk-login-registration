document.addEventListener("DOMContentLoaded", function () {
    if (typeof grecaptcha !== "undefined") {
        grecaptcha.ready(function () {
            grecaptcha.execute(recaptcha_object.site_key, { action: "login" })
                .then(function (token) {
                    document.getElementById("g-recaptcha-response").value = token;
                });
        });
    }
});

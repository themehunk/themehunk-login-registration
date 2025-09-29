document.addEventListener("DOMContentLoaded", function () {
    // Handle reCAPTCHA
    if (typeof grecaptcha !== "undefined") {
        grecaptcha.ready(function () {
            grecaptcha.execute(recaptcha_object.site_key, { action: "login" })
                .then(function (token) {
                    document.getElementById("g-recaptcha-response").value = token;
                }).catch(function (error) {
                    console.error("ReCAPTCHA error:", error);
                });
        });
    }


                        function switchForm(target) {
                            document.querySelectorAll(".thlogin-form").forEach(function (f) {
                                f.style.display = "none";
                            });
                            var form = document.querySelector(".thlogin-form--" + target);
                            if (form) {
                                form.style.display = "block";
                            }
                            document.querySelectorAll(".thlogin-toggle-button").forEach(function (btn) {
                                btn.classList.remove("is-active");
                            });
                            var activeBtn = document.querySelector(".thlogin-toggle-button--" + target);
                            if (activeBtn) {
                                activeBtn.classList.add("is-active");
                            }
                        }

                        switchForm("login"); // Default form

                        document.querySelectorAll("[data-th-popup-action]").forEach(function (btn) {
                            btn.addEventListener("click", function (e) {
                                e.preventDefault();
                                switchForm(this.getAttribute("data-th-popup-action"));
                            });
                        });

                        document.querySelectorAll(".thlogin-slide-in-left").forEach(function (el) {
                            el.classList.remove("thlogin-slide-in-left");
                        });
                  


});

// render_auto_popup_shortcode
document.addEventListener("DOMContentLoaded", function () {
            var modal = document.querySelector(".thlogin-auto-popup-shortcode-wrapper .thlogin-popup-modal");
            if (modal) {
                modal.style.display = "flex";
                modal.classList.add("thlogin-popup-modal--active");
                modal.setAttribute("aria-hidden", "false");
            }

            function switchForm(target) {
                document.querySelectorAll(".thlogin-form").forEach(function (f) {
                    f.style.display = "none";
                });
                var form = document.querySelector(".thlogin-form--" + target);
                if (form) {
                    form.style.display = "block";
                }
                document.querySelectorAll(".thlogin-toggle-button").forEach(function (btn) {
                    btn.classList.remove("is-active");
                });
                var activeBtn = document.querySelector(".thlogin-toggle-button--" + target);
                if (activeBtn) {
                    activeBtn.classList.add("is-active");
                }
            }

            // Initial form = login
            switchForm("login");

            // Form toggle buttons (login/register/forgot)
            document.querySelectorAll("[data-th-popup-action]").forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    var target = this.getAttribute("data-th-popup-action");
                    switchForm(target);
                });
            });

            // Close button functionality
            document.querySelectorAll(".thlogin-popup-close-button").forEach(function (btn) {
                btn.addEventListener("click", function () {
                    modal.classList.remove("thlogin-popup-modal--active");
                    modal.style.display = "none";
                    modal.setAttribute("aria-hidden", "true");
                });
            });
        });

document.addEventListener("DOMContentLoaded", function () {
    function switchForm(target) {
        document.querySelectorAll(".thlogin-form").forEach(f => f.style.display = "none");
        const form = document.querySelector(".thlogin-form--" + target);
        if (form) form.style.display = "block";
        document.querySelectorAll(".thlogin-toggle-button").forEach(btn => btn.classList.remove("is-active"));
        const activeBtn = document.querySelector(".thlogin-toggle-button--" + target);
        if (activeBtn) activeBtn.classList.add("is-active");
    }
    switchForm("login");
    document.querySelectorAll("[data-th-popup-action]").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            switchForm(this.getAttribute("data-th-popup-action"));
        });
    });
});

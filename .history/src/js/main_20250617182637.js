import "/src/sass/style.scss";

document.querySelector(".search__trigger").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".search").classList.toggle("active");

    if (document.querySelector(".search").classList.contains("active")) {
        document.querySelector(".search__input").focus();
    }
});

// Закрытие при клике вне области
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search") && !e.target.closest(".heeader__actions")) {
        document.querySelector(".search").classList.remove("active");
    }
});

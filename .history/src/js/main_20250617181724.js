import "/src/sass/style.scss";

document.querySelector(".search__trigger").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".search").classList.toggle("active");

    if (document.querySelector(".search").classList.contains("active")) {
        document.querySelector(".search__input").focus();
    }
});

document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) {
        document.querySelector(".search").classList.remove("active");
    }
});

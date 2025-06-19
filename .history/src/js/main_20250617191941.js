import "/src/sass/style.scss";

const search = document.querySelector(".search");
const icon = document.querySelector(".search__icon");

icon.onclick = function () {
    search.classList.toggle("active");
};

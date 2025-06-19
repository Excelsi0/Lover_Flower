import "/src/sass/style.scss";

const search = document.querySelector(".search");
const icon = document.querySelector(".search__icon");

icon.addEventListener("click", () => {
    if (!search.classList.contains("active")) {
        search.classList.remove("hidden");
        requestAnimationFrame(() => {
            search.classList.add("active");
        });
    } else {
        search.classList.remove("active");
        setTimeout(() => {
            search.classList.add("hidden");
        }, 300); // должно совпадать с transition-duration
    }
});

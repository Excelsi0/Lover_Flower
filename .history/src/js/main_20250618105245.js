import "/src/sass/style.scss";

// // скрипт ИИ для поиска
// document.querySelector(".search__icon").addEventListener("click", function () {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     search.classList.toggle("active");
//     header.classList.toggle("search-active");

//     if (search.classList.contains("active")) {
//         document.querySelector(".search__input input").focus();
//     }
// });

// document.addEventListener("click", function (e) {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     if (!e.target.closest(".search")) {
//         search.classList.remove("active");
//         header.classList.remove("search-active");
//     }
// });

const header = document.querySelector(".header");
const trigger = document.querySelector(".js-search-trigger");
const searchInput = document.querySelector(".search__field input");

trigger.addEventListener("click", () => {
    header.classList.toggle("search-active");
    if (header.classList.contains("search-active")) {
        searchInput.focus();
    }
});

document.addEventListener("click", (e) => {
    const isClickInside = e.target.closest(".search");
    if (!isClickInside) {
        header.classList.remove("search-active");
    }
});

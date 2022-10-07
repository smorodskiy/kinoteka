import Pagination from "./pagination/index.js";
import { fetchMovie, fetchGenres } from "./services/fetch.js";
import { debounce } from "lodash";
import { initRender } from "./movies";
import { saveToStorage } from "./services/storage.js";

export const DEBOUNCE_DELAY = 300;

// Wait the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
        // Refs to DOM elements
        const searchElem = document.querySelector(".search__input");
        // const goBtnElem = document.querySelector(".search__go-btn");

        // On Enter click
        searchElem.addEventListener("keydown", (e) => {
                if (e.keyCode === 13) {
                        e.preventDefault();
                        getMovieByName_deb({
                                keyword: searchElem.value,
                                pagination: true,
                        });
                }
        });

        // On button click
        // goBtnElem.addEventListener("click", () => {
        //         getMovieByName_deb(searchElem.value, 1);
        // });

        getGenres();
        getMovieByName_deb({ pagination: true });
});

// Post http req and trying to get pictures
async function getMovieByName(param) {
        try {
                // Send http req, trying get the pictures
                const response = await fetchMovie(param);

                if (response.status != 200) {
                        throw new Error(response.status);
                }

                if (response.data == undefined) {
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                // Get total pages and cur page
                const { total_pages } = dataJSON;

                // If nothing founded throw Message and return
                // if (totalHits == 0) {
                //         throw new Error(
                //                 `Sorry, there are no images matching your search "${name}" query. Please try again.`,
                //         );
                // }

                // Initialization rendering gallery
                initRender(dataJSON);

                // Initialization pagination
                const { pagination } = param;
                if (pagination) initPagination(total_pages, param);
        } catch (error) {
                console.log(error);
        }
}

export const getMovieByName_deb = debounce((param) => {
        getMovieByName(param);
}, DEBOUNCE_DELAY);

// Post http req and trying to get pictures
async function getGenres() {
        try {
                // Send http req, trying get the pictures
                const response = await fetchGenres();

                if (response.status != 200) {
                        throw new Error(response.status);
                }

                if (response.data == undefined) {
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                // Save genres to localStorage
                saveToStorage("genres", dataJSON);
        } catch (error) {
                console.log(error);
        }
}

function initPagination(total_pages, param) {
        // myPager.getCurrentPage();
        // myPager.goToPage(num);

        const { keyword } = param;

        // if (total_pages > 500) total_pages = 500;

        // Init Pagination
        const myPager = new Pagination(
                total_pages,
                20,
                function (page) {
                        console.log(page);
                        getMovieByName_deb({
                                keyword,
                                page: page.current,
                                pagination: false,
                        });
                },
                ".pagination",
        );
        console.log(myPager);
}

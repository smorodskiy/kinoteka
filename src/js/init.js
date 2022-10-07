import { fetchMovie, fetchGenres } from "./services/fetch.js";
import { debounce } from "lodash";
import { initRender } from "./movies";
import { save } from "./services/storage.js";

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
                        getPicturesByName_deb({
                                keyword:searchElem.value,                                
                        });                        
                }
        });

        // On button click
        // goBtnElem.addEventListener("click", () => {
        //         getPicturesByName_deb(searchElem.value, 1);
        // });
        getGenres();
        getPicturesByName_deb({});
});

// Post http req and trying to get pictures
async function getPicturesByName(param) {
        try {
                // Send http req, trying get the pictures
                const response = await fetchMovie(param);

                // console.log(response);

                if (response.status != 200) {
                        // Notiflix.Notify.failure(response.status);
                        throw new Error(response.status);
                }

                if (response.data == undefined) {
                        // Notiflix.Notify.failure("Incorrect data");
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                console.log(dataJSON);

                // Initialization rendering gallery
                initRender(dataJSON);
        } catch (error) {
                console.log(error);
                // Notiflix.Notify.failure(error.message);
        }
}

export const getPicturesByName_deb = debounce((name, currentPage)=>{
        getPicturesByName(name, currentPage);
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

                console.log(dataJSON);

                save('genres', dataJSON);
        } catch (error) {
                console.log(error);
        }
}
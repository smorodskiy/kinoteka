// Num of page from request
import { fetchMovie } from "./services/fetch.js";
import { load } from "./services/storage.js";

// Components of style
import { createMovieCard } from "./style/card";

// Clear gallery
function clearGallery() {
        const gallery = document.querySelector(".movies-section__grid");
        gallery.innerHTML = "";
}

function getGenresByID({genres : genresList}, ids) {
        
        // console.log(genresList);
        
        const res = genresList.filter((genre) => {
                
if (ids.includes(genre['id'])) {
        return Object.values(genre);n
}

              
        });

        console.log(res);
        return;
}

// Rendering founded pictures to grid
function renderMoviesList(dataJSON) {
        const gallery = document.querySelector(".movies-section__grid");

        const { results: moviesList } = dataJSON;

        const genreList = load("genres");

        console.log(genreList);

        // Remap json to HTML elements
        const moviesCards = moviesList
                .map((movie) => {
                        const {
                                // id,
                                backdrop_path,
                                title,
                                // original_title,
                                genre_ids,
                                release_date,
                                // rate,
                                // votes,
                                // popularity,
                                // about,
                        } = movie;

                        // Get genres by id
                        const genres = getGenresByID(genreList, genre_ids);

                        // Return html
                        return createMovieCard(backdrop_path, title, genres, release_date);
                })
                .join("");

        // Append new photos to DOM
        gallery.insertAdjacentHTML("beforeend", moviesCards);

        // Get all new cards
        const newCards = gallery.querySelectorAll(".movies-section__grid__card.new");

        // Add events to cards
        // attachEventsToCards(newCards);

        return newCards;
}

// Events on click buttons in cards
// Add events on pictures and checking downloading complete
function attachEventsToCards(newCards) {
        newCards.forEach((card) => {
                // Get icons refs
                const icons = card.querySelector(".movies-section__grid__icon-wrapper");

                // Get link and img refs
                const link = card.firstElementChild;
                const img = link.firstElementChild;

                // If pic is loaded - remove skelet effect and add loaded mark on img
                img.onload = () => {
                        // Added random showing delay
                        setTimeout(() => {
                                card.classList.remove("new");
                                img.classList.add("loaded");
                        }, getRndInteger(400, 1000));
                };
        });
}

// Random nums
function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
}

// Initialization render gallery
export function initRender(dataJSON) {
        // Total founded pics on free account
        const { totalHits } = dataJSON;

        // If nothing founded throw Message and return
        if (totalHits == 0) {
                throw new Error(
                        `Sorry, there are no images matching your search "${name}" query. Please try again.`,
                );
        }

        // If it's first page
        // if (currentPage == 1) {
        // Show succes message
        // name != "" && Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

        // Calcs pages
        // numPages = Math.ceil(totalHits / PER_PAGE);

        // Remove blank pic
        // const gallery = document.querySelector(".intro");
        // gallery.style.setProperty("display", "none");
        // gallery.classList.remove("gallery--empty-page");

        // Clear all gallery
        clearGallery();

        // Rendering part of gallery
        renderMoviesList(dataJSON);

        // Add attach on scrolling and doing pagination if num of pages more than one
        // if (numPages > 1)
        //         window.onscroll = pagination.scrollPagination_deb(
        //                 name,
        //                 currentPage,
        //                 numPages,
        //         );

        // }

        // if (currentPage > 1) {
        //         // Hide waiting label and get label height
        //         pagination.showAnimation(false);

        //         // Rendering part of gallery
        //         renderMoviesList(moviesJSON);

        //         // Do smooth scroll
        //         pagination.scrollToNewCards();
        // }
}

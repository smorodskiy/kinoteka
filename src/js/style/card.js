const PREFIX_POSTER_URL = "https://image.tmdb.org/t/p/w500/";

// Create box of image
export function createMovieCard(posterURL, movieName, genres, release_date) {
        const movieCard = `

                <div class="movie__card">
                                                
                        <img class="movie__image" src="${PREFIX_POSTER_URL}${posterURL}" alt="${movieName}" loading="lazy" />                        
                        
                        <ul class="movie__info">
                                <li class="movie__item">
                                        <p>${movieName}</p>
                                </li>
                                <li class="movie__item">
                                        <p>${genres} | ${release_date}</p>
                                </li>
                        </ul>
                </div>
    
    `;

        return movieCard;
}

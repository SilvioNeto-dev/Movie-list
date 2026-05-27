
const apiKey = '3ab5364c'
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
let movieList = document.querySelector(".movies-list")
const saveMovie = document.querySelector("#save-movie")


let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

async function renderWatchlist(){
    movieList.innerHTML = ''
    if (watchlist.length === 0){
            movieList.innerHTML += ''
            document.querySelector(".landing-page").classList.remove("no-movies")
    }else {
            const watchlistUi = document.querySelector(".landing-page")
    document.querySelector(".landing-page").classList.add("no-movies")
    for (let movies of watchlist){

                movieList.innerHTML += `
                <div class="movie-cards" data-id="${movies.imdbID}">
                    <img src="${movies.Poster}" class="movie-poster">

                        <div class="text-wrapper">
                            <div class="title-rating">
                                <h1>${movies.Title}</h1>
                                <p>⭐️${movies.imdbRating}</p>
                            </div>

                            <div class="runtime-genre">
                                <h3>${movies.Runtime}</h3>
                                <h3>${movies.Genre}</h3>   
                            <div class="remove-btn">
                                <p>Remove</p>                                    
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-440v-80h560v80H200Z"/></svg>
                            </div>                                                             
                            </div>

                            <div class="plot">   
                                <p>${movies.Plot}</p>
                            </div>



                        </div>

                </div>
            `
    }
    }
}

movieList.addEventListener("click", function(e){
    if (e.target.closest(".remove-btn")){
        watchlist = watchlist.filter((movie) => movie.imdbID !== e.target.closest(".movie-cards").dataset.id)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        renderWatchlist()
    }
})

renderWatchlist()
    
const apiKey = 'fe8aa82a'
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const movieList = document.querySelector(".movies-list")
const saveMovie = document.querySelector("#save-movie")
let moviesFromSearch = []



searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    document.querySelector(".landing-page").innerHTML = ""
    movieList.innerHTML =''
    getMovies()
    searchInput.value = ''
    
})



async function getMovies(){
    const getMovies = await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=${apiKey}`)
    const res = await getMovies.json()
    moviesFromSearch = res.Search
    if (res.Response === "False"){
        document.querySelector(".landing-page").innerHTML = `
        <div class="error-search">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Zm216-60 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/></svg>
            <h1 class="start-exp">Oops, seems like we haven't watched that movie yet.<br>Please try another one!</h1>

        </div>
        `
    } else {
        for (let movie of moviesFromSearch){
            const getMovieDetails = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
            const movieDeetsRes = await getMovieDetails.json()
            movieList.innerHTML += `
                <div class="movie-cards" data-id="${movieDeetsRes.imdbID}">
                    <img src="${movieDeetsRes.Poster}" class="movie-poster">

                        <div class="text-wrapper">
                            <div class="title-rating">
                                <h1>${movieDeetsRes.Title}</h1>
                                <p>⭐️ ${movieDeetsRes.imdbRating}</p>
                            </div>

                            <div class="runtime-genre">
                                <h3>${movieDeetsRes.Runtime}</h3>
                                <h3>${movieDeetsRes.Genre}</h3>
                                <div id="save-movie">
                                    <svg class="add-to-watchlist" fill="none" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1493.33 320V0H1600v320h320v106.667h-320v320h-106.67v-320h-320V320h320ZM160 426.667c-29.455 0-53.333 23.878-53.333 53.333v1280c0 29.46 23.878 53.33 53.333 53.33h1280c29.46 0 53.33-23.87 53.33-53.33V960H1600v800c0 88.37-71.63 160-160 160H160c-88.365 0-160-71.63-160-160V480c0-88.366 71.634-160 160-160h800v106.667H160Zm373.333 279.136L1223.66 1120l-690.327 414.2V705.803ZM640 894.197V1345.8l376.34-225.8L640 894.197Z" fill-rule="evenodd"/>
                                    </svg>
                                    <p>Watchlist</p>
                                </div>
                            </div>

                            <div class="plot">   
                                <p>${movieDeetsRes.Plot}</p>
                            </div>

                        </div>

                </div>
            `
        }


    }
        

        
}
    movieList.addEventListener("click", async function(e){
        if(e.target.closest("#save-movie")){

            let savedMovies = moviesFromSearch.find((movie)=>{
                return movie.imdbID === e.target.closest(".movie-cards").dataset.id
            })
            const getMovieDetails = await fetch(`https://www.omdbapi.com/?i=${savedMovies.imdbID}&apikey=${apiKey}`)
            const movieDeetsRes = await getMovieDetails.json()
            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
            if (!watchlist.find((movie) => movie.imdbID === savedMovies.imdbID)){
                watchlist.push(movieDeetsRes)
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
                document.querySelector(".added").classList.add("show-alert")
                setTimeout(()=> {
                    document.querySelector(".added").classList.remove("show-alert")
                }, 1000)
            }
        }
    })
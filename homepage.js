let currentTimerID;


document.querySelector("#search").addEventListener("input", function(){
    debounceSearch(mainSearch, 1000);
});

document.querySelector("#searchbtn").addEventListener("click", mainSearch);



async function searchMovie(name){
    //let name = document.querySelector("#search").value;
    try{
        let api_fetch = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4aae6d60&s=${name}`);
        let movieData = await api_fetch.json();

        if(movieData.Response !== "False"){
            // appendMovies(movieData.Search)
            console.log("movie response", movieData);
            return movieData.Search;
        }
        
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}


function appendMovies(data){
    let movies = document.querySelector("#movieContainer");
    movies.innerHTML = null;
    
    document.querySelector("#header").style.display = "block";


    data.map(function(elem, index){
        let movieDiv = document.createElement("div");
        movieDiv.setAttribute("class", "movieDiv")
        let pImg = document.createElement("img");
        if(elem.Poster === "N/A"){
            pImg.src = "https://www.emich.edu/cmta/images/faculty/headshot.png?v=2019-09-24T18:48:06Z"
        }
        else{
            pImg.src = elem.Poster;
        }

        let movieTitle = document.createElement("p");
        movieTitle.setAttribute("class", "movieTitle");
        movieTitle.innerText = `${elem.Title} (${elem.Year})`;

        movieDiv.addEventListener("click", function(){
            fetchMovie(elem.imdbID);
        })
        movieDiv.append(pImg, movieTitle);
        movies.append(movieDiv);
    })
}


async function mainSearch(){
    let name = document.querySelector("#search").value;
    try{
        let searchResults = await searchMovie(name);
        if(searchResults !== undefined){
            console.log(searchResults);
            appendMovies(searchResults);
        }
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}
    


function debounceSearch(func, delay){
    if(currentTimerID){
        clearTimeout(currentTimerID);
    }

    currentTimerID = setTimeout(function(){
        func();
    }, delay)
// mainSearch();
}


async function fetchMovie(id){
    try{
        let movieFetch = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=4aae6d60`);
        let movieDetails = await movieFetch.json();
        console.log(movieDetails);
        openMovieModal(movieDetails);
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}




/* AREA TO OPEN AND CLOSE MODAL WINDOW*/

let modal = document.querySelector("#modalMovieContainer");

let closebtn = document.querySelector("#close");

//let btn = document.querySelector("#searchbtn");

//console.log(btn);



function openMovieModal(movie){
    if(movie.Poster === "N/A"){
        document.querySelector("#posterInfo").src = "https://www.emich.edu/cmta/images/faculty/headshot.png?v=2019-09-24T18:48:06Z"
    }
    else{
        document.querySelector("#posterInfo").src = movie.Poster;
    }
    
    document.querySelector("#movieInfoName").innerText = movie.Title;
    document.querySelector("#genre").innerText = movie.Genre;
    document.querySelector("#cast").innerText = movie.Actors;
    document.querySelector("#plot").innerText = movie.Plot;
    document.querySelector("#release").innerText = movie.Released;
    document.querySelector("#runtime").innerText = movie.Runtime;
    document.querySelector("#rating").innerText = `${movie.imdbRating} / 10`;
    modal.style.display = "block";
}

closebtn.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
}
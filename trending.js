window.onload = async function(){
    try{
        let fetchPromise = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=45734bb9e4c5707b35b38c19792a54ef`);
        let movieData = await fetchPromise.json();
        console.log(movieData);
        appendMovies(movieData.results)
    }
    catch(e){
        console.log(`error: ${e}`)
    }
}

function appendMovies(data){
    let moviebox = document.querySelector("#movieContainer");
    moviebox.innerHTML = null;
    
    let header = document.querySelector("#header")
    header.innerText = "Movies Trending This Week";

    data.forEach((el, index) => {
        let movieDiv = document.createElement("div");
        movieDiv.setAttribute("class", "movie");

        let poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/original/${el.poster_path}`;
        poster.setAttribute("class", "poster")

        let title = document.createElement("p");
        title.innerText = `${el.title} (${el.release_date.split("-")[0]})`
        title.setAttribute("class", "title");

        movieDiv.append(poster, title);

        moviebox.append(movieDiv)
    })
}






// 
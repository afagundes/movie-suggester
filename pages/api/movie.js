export default async function handler(_, res) {
    try {
        const apiKey = process.env.IMDB_API_KEY;
        const moviesResponse = await fetch(selectRandomAPI(apiKey));
        const body = await moviesResponse.json();

        if (!moviesResponse.ok || body.errorMessage) {
            console.error(`Status ${moviesResponse.status}: ${body.errorMessage}`);
            res.status(500).json(body.errorMessage);
            return;
        }

        const selectedMovie = selectRandomMovie(body.items);
        const details = await getMovieDetails(apiKey, selectedMovie);
        
        const movie = {
            ...selectedMovie,
            plot: details.plot,
            plotLocal: details.plotLocal,
        }

        res.status(200).json(movie);
    }
    catch (e) {
        console.error('Error fetching IMDB API', e);
        res.status(500).json({ error: 'Error fetching IMDB API' });
    }
}

async function getMovieDetails(apiKey, selectedMovie) {
    const detailsResponse = await fetch(`https://imdb-api.com/pt-BR/API/Title/${apiKey}/${selectedMovie.id}`);

    if (!detailsResponse.ok) {
        res.status(detailsResponse.status).json(detailsResponse.statusText);
        return;
    }

    return await detailsResponse.json();
}

function selectRandomAPI(apiKey) {
    const apis = [
        `https://imdb-api.com/pt-BR/API/Top250Movies/${apiKey}`,
        `https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`
    ];

    const randomIndex = randomIntFromInterval(0, apis.length - 1);
    return apis[randomIndex];
}

function selectRandomMovie(movies) {
    const randomIndex = randomIntFromInterval(0, movies.length - 1);
    return movies[randomIndex];
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

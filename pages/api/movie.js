export default async function handler(_, res) {
    try {
        const apiKey = process.env.IMDB_API_KEY;
        const moviesResponse = await fetch(`https://imdb-api.com/pt-BR/API/Top250Movies/${apiKey}`);

        if (!moviesResponse.ok) {
            res.status(moviesResponse.status).json(moviesResponse.statusText);
            return;
        }

        const movies = await moviesResponse.json();
        const selectedMovie = selectRandomMovie(movies.items);

        const detailsResponse = await fetch(`https://imdb-api.com/pt-BR/API/Title/${apiKey}/${selectedMovie.id}`);

        if (!detailsResponse.ok) {
            res.status(detailsResponse.status).json(detailsResponse.statusText);
            return;
        }

        const details = await detailsResponse.json();
        
        const movie = {
            ...selectedMovie,
            plot: details.plot,
            plotLocal: details.plotLocal,
        }

        res.status(200).json(movie);
    }
    catch (e) {
        console.error('Erro ao consultar a API do IMDB', e);
        res.status(500).json({ error: 'Erro ao consultar a API do IMDB' });
    }
}

function selectRandomMovie(movies) {
    const randomIndex = randomIntFromInterval(0, movies.length - 1);
    return movies[randomIndex];
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

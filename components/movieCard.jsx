const MovieCard = ({ movie }) => {
    if (!movie) {
        return (
            <p className="text-white text-base">
                Carregando...
            </p>
        )
    }

    return (
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-4 bg-slate-800 p-8 rounded-lg ring-1 ring-slate-900/5 shadow-md">
            <img 
            src={movie.image} 
            alt={movie.title}
            className="w-fit"
            />
            <div className="text-slate-300 h-full">
            <h2 className="font-bold text-lg text-purple-500 text-center lg:text-left">{movie.title}</h2>

            <div className="flex gap-4 text-sm mt-1 justify-center lg:justify-start">
                <p><span className="text-purple-500 pr-1">Ano:</span> {movie.year}</p>
                <p><span className="text-purple-500 pr-1">Nota:</span> {movie.imDbRating}/10</p>
            </div>

            <article className="mt-3">
                <p className="text-base text-center lg:text-left">
                    {movie.plotLocal}
                </p>
            </article>
            </div>
        </section>
    )
}

export default MovieCard;
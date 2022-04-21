import Spinner from "./spinner";

const MovieCard = ({ movie, loading, errorMessage }) => {
    if (errorMessage) {
        return (
            <p className="text-white">
                {errorMessage}
            </p>
        )
    }

    if (loading) return <Spinner />

    return (
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-4 bg-slate-800 p-8 my-4 lg:my-10 rounded-lg ring-1 ring-slate-900/5 shadow-md">
            <img
                src={movie.image}
                alt={movie.title}
                className="w-fit border-4 border-purple-500 shadow-lg rounded"
            />
            <div className="text-slate-300 h-full">
                <h2 className="font-bold text-lg text-purple-500 text-center lg:text-left">{movie.title}</h2>

                <div className="flex gap-5 text-sm mt-1 mb-4 justify-center lg:justify-start">
                    <p><span className="text-purple-500 pr-1">Year:</span> {movie.year}</p>
                    <p><span className="text-purple-500 pr-1">Rating:</span> {movie.imDbRating}/10</p>
                </div>

                <article>
                    <p className="text-center lg:text-left">
                        {movie.plotLocal}
                    </p>
                </article>
            </div>
        </section>
    )
}

export default MovieCard;
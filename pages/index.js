import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/movieCard";

export default function Home() {
  const scrollRef = useRef();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const findMovie = async () => {
    scrollRef.current.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });

    setLoading(true);
    setMovie(null)
    setErrorMessage(null);

    const response = await fetch("/api/movie");
    
    if (!response.ok) {
      console.error('Error fetching movies API');
      setErrorMessage('Error fetching movies API 😔');
      setLoading(false);
      return;
    }

    const movie = await response.json();
    
    setMovie(movie);
    setLoading(false);
    setErrorMessage(null);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      await findMovie();
    }

    fetchMovies();
  }, []);
  
  return (
    <main ref={scrollRef} className="w-full flex flex-col items-center px-6 py-10 lg:py-10 bg-zinc-900">

        <h1 className="font-bold text-3xl text-white mb-10">
          Watch this <span className="text-purple-500">Movie</span>
        </h1>

        <div className="flex items-center justify-center min-h-card">
          <MovieCard movie={movie} loading={loading} errorMessage={errorMessage} />
        </div>

        <button 
          onClick={findMovie}
          disabled={loading}
          className={(loading ? "cursor-not-allowed" : "hover:bg-purple-600 hover:-translate-y-0.5") + " bg-purple-800 transition ease-in duration-75 text-white font-bold py-2 mt-10 w-full lg:w-1/4 rounded-lg shadow-md"}
        >
          I want another movie
        </button>
    </main>
  )
}

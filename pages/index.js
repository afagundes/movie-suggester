import { useState, useEffect } from "react";
import MovieCard from "../components/movieCard";

export default function Home() {
  const [movie, setMovie] = useState();

  const findMovie = async () => {
    const response = await fetch("/api/movie");
    
    if (!response.ok) {
      console.error('Erro ao consultar a api de filmes');
      return;
    }

    const movie = await response.json();
    setMovie(movie);
  }

  useEffect(() => findMovie(), []);
  
  return (
    <main className="w-full h-screen flex flex-col justify-around items-center px-6 py-10 bg-zinc-900">

        <h1 className="font-bold text-3xl text-white">
          Assista esse <span className="text-purple-900">Filme</span>
        </h1>

        <MovieCard movie={movie} />

        <button 
          onClick={findMovie}
          className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 w-full lg:w-1/4 rounded-lg shadow-md transition ease-in-out delay-150"
        >
          Quero outro Filme
        </button>
    </main>
  )
}

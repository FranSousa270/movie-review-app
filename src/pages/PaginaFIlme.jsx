import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StarIcon, StarOffIcon } from "lucide-react";
import { Spinner } from "flowbite-react";
import { getReviewByMovieId } from "../utilitaries/Recomendacao";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function PaginaFilme() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userReview, setUserReview] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setUserReview(getReviewByMovieId(id));
  }, [id]);

  useEffect(() => {
    const saved = localStorage.getItem(`movie_${id}`);
    if (saved) {
      const { rating, review } = JSON.parse(saved);
      setRating(rating || 0);
      setReview(review || "");
    }
  }, [id]);

  const saveReview = (newRating = rating, newReview = review) => {
    localStorage.setItem(
      `movie_${id}`,
      JSON.stringify({
        rating: newRating,
        review: newReview,
        genres: movie.genres.map((g) => g.id),
      })
    );
    window.dispatchEvent(new Event("reviewUpdated"));
  };
  const handleRate = (value) => {
    setRating(value);
    saveReview(value, review);
    setUserReview(getReviewByMovieId(id));
  };

  const fetchMovie = async () => {
    const res = await fetch(
      `${API_BASE_URL}/movie/${id}?language=pt-BR`,
      API_OPTIONS
    );
    const data = await res.json();
    setMovie(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Spinner
        aria-label="Default status example"
        className="absolute left-0 right-0 top-0 bottom-0"
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      {userReview?.rating && (
        <div className="flex items-center gap-2 mt-1">
          <StarIcon fill="#facc15" className="text-yellow-400 w-5 h-5" />
          <span className="text-yellow-400 font-semibold">
            Sua nota: {userReview.rating}
          </span>
        </div>
      )}
      <div className="flex gap-8 md:flex-row flex-col">
        <img
          className="w-72 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="text-slate-200">{movie.overview}</p>

          <div className="flex gap-2 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-slate-700 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
            <div className="flex ml-1 relative mt-0.5">
              <StarIcon fill="#facc15" className="inline w-6 h-6 text-yellow-400 " />

              <p className="text-cyan-50 font-medium absolute left-7 bottom-0">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-7">
        <p className="text-slate-100">Sua avaliação</p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className="transition-transform hover:scale-110 cursor-pointer"
            >
               
                <StarIcon
                className="w-7 h-7"
                 fill={star <= rating ? "#facc15" : "none"}
                 strokeWidth={2} 
                 color="#facc15"/>
              
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <label className="text-slate-100">
          O que você achou do filme?
        </label>
        
<p
  className={`
    text-sm text-green-400
    overflow-hidden
    transition-all duration-500 ease-out
    ${saved
      ? "opacity-100 max-h-10 mt-1 translate-y-0"
      : "opacity-0 max-h-0 mt-0 -translate-y-1"}
  `}
>
  ✓ Avaliação salva com sucesso
</p>


            
    

        <textarea
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            saveReview(rating, e.target.value);
          }}
          placeholder="Escreva sua opinião..."
          rows={4}
          className={`w-full bg-slate-900 border rounded-md p-3 transition-all duration-500 ease-out
    ${
      saved
        ? "border-green-400 ring-2 ring-green-400/40"
        : "border-slate-700 focus:ring-cyan-500"
    }
  `}
        />
        <button
          onClick={() => {
            saveReview();
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
          }}
          className="mt-2 cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Salvar avaliação
        </button>
      </div>
      <button
        onClick={() => {
          window.history.back();
        }}
        className="mt-6 cursor-pointer bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md transition-colors"
      >
        Voltar
      </button>
    </div>
  );
}

export default PaginaFilme;

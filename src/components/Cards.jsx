import { Star, StarHalf, StarIcon, StarOffIcon } from "lucide-react";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useNavigate } from "react-router-dom";
import { getReviewByMovieId } from "../utilitaries/Recomendacao";

function Cards({
  filme: { title, poster_path, release_date, vote_average, id, }, variant = "grid",
}) {
  const isRow = variant === "row";
  const formatReleaseDate = (release_date) => {
    if (!release_date) return "N/A";
    const date = new Date(release_date);
    return format(date, "yyyy", { locale: ptBR });
  };
  const navigate = useNavigate();
  const review = getReviewByMovieId(id);
  const badgeColor =
  review?.rating >= 4
    ? "bg-green-500"
    : review?.rating >= 3
    ? "bg-yellow-500"
    : "bg-red-500";


  return (
    <div onClick={() => navigate(`/movie/${id}`)} className={`bg-slate-800 relative shadow-2xl rounded-md p-2 w-[250px] shrink-0 transition-transform duration-300 ${isRow ? "cursor-pointer" : "hover:scale-105 cursor-pointer"}`}>
      {review?.rating && (
    <span className={`absolute top-2 left-2 ${badgeColor} text-black text-xs font-bold px-2 py-1 rounded-md shadow`}>
      ⭐ {review.rating}
    </span>
  )}
      
      <img
        className="rounded-md"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
      />
      <div className="mt-2 space-y-1.5">
        <h2 className="text-cyan-50 text-center">{title}</h2>
        <div className="flex text-left items-center justify-center space-x-2.5">
          <StarIcon fill="#facc15" className="inline w-5 h-5 text-yellow-400 mb-0.5 mr-2" />
          <p className="text-cyan-50 font-medium">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          <span className="text-cyan-50">•</span>
          <p className="text-cyan-50 text-sm font-medium">{formatReleaseDate(release_date)}</p>
        </div>
      </div>
    </div>
  );
}
export default Cards;

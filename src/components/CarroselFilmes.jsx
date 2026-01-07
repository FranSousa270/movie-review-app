import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cards from "./Cards";

function MovieRow({ title, movies,}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const { current } = rowRef;
    const scrollAmount = 500; 

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className="relative mb-10">
      <h2 className="text-white text-xl font-semibold mb-4 ml-4">
        {title}
      </h2>

      {/* seta esquerda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* lista horizontal */}
      <div
        ref={rowRef}
        className="flex gap-6 overflow-hidden scroll-smooth [&>div]:w-[200px] px-12"
      >
        {movies.map((filme) => (
          <Cards key={filme.id} filme={filme} variant="row" />
        ))}
      </div>

      {/* seta direita */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
      >
        <ChevronRight className="text-white" />
      </button>
    </section>
  );
}

export default MovieRow;

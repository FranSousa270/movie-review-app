import Cards from "./../components/Cards";
import banner from "./../assets/banner.png";
import Search from "./../components/Search";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import CarroselFilmes from "./../components/CarroselFilmes";
import { useDebounce } from "react-use";
import { getFavoriteGenres } from "../utilitaries/Recomendacao";    

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "aplication/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [listaFilmes, setListaFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [debouncedPesquisa, setDebouncedPesquisa] = useState("");
  const [recommended, setRecommended] = useState([]);

  const fetchRecommendedMovies = async () => {
    const favoriteGenres = getFavoriteGenres();
    if (favoriteGenres.length === 0) return;

    const genreQuery = favoriteGenres.slice(0, 2).join(",");

    const res = await fetch(
      `${API_BASE_URL}/discover/movie?with_genres=${genreQuery}&language=pt-BR`,
      API_OPTIONS
    );

    const data = await res.json();
    setRecommended(data.results.slice(0, 15));
  };

 useEffect(() => {
  fetchRecommendedMovies();

  const handleUpdate = () => {
    fetchRecommendedMovies();
  };

  window.addEventListener("reviewUpdated", handleUpdate);

  return () => {
    window.removeEventListener("reviewUpdated", handleUpdate);
  };
}, []);

  useDebounce(
    () => {
      setDebouncedPesquisa(pesquisa);
    },
    500,
    [pesquisa]
  );

  const fetchTrendingWeek = async () => {
    const res = await fetch(
      `${API_BASE_URL}/trending/movie/week?language=pt-BR`,
      API_OPTIONS
    );
    const data = await res.json();
    setTrendingWeek(data.results);
  };

  const fetchTopRated = async () => {
    const res = await fetch(
      `${API_BASE_URL}/movie/top_rated?language=pt-BR&page=1`,
      API_OPTIONS
    );
    const data = await res.json();
    setTopRated(data.results.slice(0, 15));
  };

  const fetchMovies = async (query = "") => {
    setCarregando(false);
    setMensagemError("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&language=pt-BR`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&language=pt-BR`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();
      console.log(data);
      if (data.response === "false") {
        setMensagemError(data.error || "Nenhum filme encontrado.");
        setListaFilmes([]);
        return;
      }
      setListaFilmes(data.results || []);
    } catch (error) {
      console.error(`Erro ao buscar filmes: ${error}`);
      setMensagemError("Erro ao buscar filmes. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedPesquisa);
  }, [debouncedPesquisa]);

  useEffect(() => {
    fetchTopRated();
    fetchTrendingWeek();
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b  from-sky-950 to-slate-900 font-noto-sans flex ">
      <div className="mb-20 max-w-6xl mx-auto space-y-4   px-4">
        <header className="text-red-100  font-bold flex flex-col justify-center items-center space-y-10 relative">
          <img className="w-[450px]" src={banner} alt="Banner" />
          <h1 className="text-4xl top-90 bottom-0 left-0 right-0 absolute text-center">
            Avalie Seus Filmes com{" "}
            <span className="bg-linear-to-r from-cyan-100 to-blue-500 bg-clip-text text-transparent">
              Facilidade
            </span>{" "}
            e{" "}
            <span className="bg-linear-to-r from-teal-100 to-teal-500 bg-clip-text text-transparent">
              Praticidade
            </span>
          </h1>
        </header>
        <div className="flex justify-center -mt-4">
          <Search pesquisa={pesquisa} setPesquisa={setPesquisa} />
        </div>

        <section className="shadow-md space-y-4">
          <h2 className="text-white text-left text-2xl ml-4">
            Todos os filmes
          </h2>
          {carregando ? (
            <Spinner aria-label="Default status example" />
          ) : mensagemError ? (
            <p className="text-red-600">{mensagemError}</p>
          ) : (
            <ul className="grid grid-cols-4 gap-6">
              {listaFilmes.map((filme) => (
                <Cards key={filme.id} filme={filme} />
              ))}
            </ul>
          )}
          {recommended.length > 0 && (
            <CarroselFilmes className="mt-10"
              title="Baseado no que você gostou"
              movies={recommended}
            />
          )}

          <p className="text-red-600">{mensagemError}</p>
        </section>
        <section>
          <CarroselFilmes title="Mais bem avaliados" movies={topRated} />
        </section>
        <section>
          <CarroselFilmes title="Tendências da semana" movies={trendingWeek} />
        </section>
      </div>
    </main>
  );
}

export default Home;

import { SearchIcon } from "lucide-react";
function Search({ pesquisa, setPesquisa }) {
  return (
    <div className="flex bg-slate-400 shadow-2xl p-1 space-x-3 rounded-md w-[500px] ">
      <SearchIcon className="ml-2 mt-1" />
      <input
        type="text"
        placeholder="Pesquise diversos filmes"
        className="rounded-md p-1 outline-0"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      
    </div>
  );
}

export default Search;
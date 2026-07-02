interface Props{

    search:string;
    setSearch:(value:string)=>void;

}

export default function SearchBar({
    search,
    setSearch

}:Props){

    return(
        <input
            placeholder="Поиск..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    );
}
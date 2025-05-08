import { Categories } from "./categoreis";
import { SearchInput } from "./search-input";

interface Props{
    data:any;
}

export const SearchFilters = ({
    data,
}:Props) => {
    return(
        <div>
            <SearchInput disabled={false}/>
            <Categories data={data}/>
            
        </div>
    )
}
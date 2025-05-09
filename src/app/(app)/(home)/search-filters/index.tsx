import { CustomCategory } from "../types";
import { Categories } from "./categoreis";
import { SearchInput } from "./search-input";

interface Props{
    data:CustomCategory[];
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
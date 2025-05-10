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
        <div
            className="Px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
        >
            <SearchInput data={data}/>
            <div className="hidden lg:block">
                <Categories data={data}/>
            </div>
        </div>
    )
}
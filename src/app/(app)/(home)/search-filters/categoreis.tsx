import { CategoryDropdown } from "./category-dropdown"

interface CategoriesProps {
    data : any
}

export const Categories = ({
    data
}:CategoriesProps) =>{
    return(
        <div>
            {
                data.map((category:any) => (
                    <div
                        key={category.id}
                    >
                        <CategoryDropdown
                            category = {category}
                            isActive = {false}
                            isNavigationHovered = {false}
                        />
                    </div>
            ))}  
        </div>
    )
}
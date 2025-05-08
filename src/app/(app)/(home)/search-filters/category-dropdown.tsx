import { Button } from "@/components/ui/button";
import {Category} from "@/payload-types"  
import { cn } from "@/lib/utils";

interface Props{
    category: Category;
    isActive?:boolean;
    isNavigationHovered?:boolean;
}

export const CategoryDropdown = ({
    category,
    isActive,
    isNavigationHovered
}:Props)=>{
    return(
        <div className="pl-4">
            <Button
                 variant="elevated"
                 className ={cn(
                    "h-11 px-4 bg-transparent border-transparent rounded-full bover:bg-white hover:border-primary text-black"
                    ,
                    isActive && !isNavigationHovered && "bg-white border-primary text-primary"
                )}
            >
                {category.name}
            </Button>
        </div>
    )
}
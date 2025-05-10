
import Link from "next/link";
import { CustomCategory } from "../types";

interface SubcategoryMenuProps {
    category: CustomCategory;
    isOpen: boolean;
    position: { top: number; left: number }
}


export const SubcategoryMenu = ({
    category,
    isOpen,
    position,
}: SubcategoryMenuProps) => {


    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {

        return null;
    }

    const backgroundColor = category.color || "F5F5F5";
    // const backgroundColor = "e0cda7";


    return (
        <div
            className="fixed z-[100]" // fixed z-index value
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            {/* Invisible bridge to maintain hover */}
            <div className="h-3 w-60" />

            <div
                style={{
                    backgroundColor:backgroundColor,
                }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px]"
            >
                {category.subcategories?.map((subcategory: CustomCategory) => (
                    <Link
                        key={subcategory.slug}
                        href={`/${category.slug}/${subcategory.slug}`}
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
                    >
                        {subcategory.name}
                    </Link>
                ))}
            </div>
        </div>

        // <>
        //     {/* {category.subcategores?.map((subcategory:Category)=>(
        //         <>{subcategory.name}</>
        //     ))} */}
        //     {/* {category.subcategories?.map((subcategory:Category)=>(
        //         <>{subcategory.name}</>
        //     ))} */}
        // </>
    )
}
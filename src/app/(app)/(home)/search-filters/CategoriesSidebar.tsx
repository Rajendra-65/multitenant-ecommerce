"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoriesGetmanyOutput } from "@/modules/categories/types";

interface Props {
    open : boolean;
    onOpenChangeAction: (open:boolean) => void;
}

export const CategoriesSidebar = ({
    open,
    onOpenChangeAction,
}:Props) => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.categories.getMany.queryOptions())
    const router = useRouter()

    const [parentCategories , setParentCategories] = useState<CategoriesGetmanyOutput|null>(null)
    const [selectedCategory , setSelectedCategory] = useState<CategoriesGetmanyOutput[1] | null>(null)

    // if we have parent categories show tose, otherwise show root
    const currentCategories = parentCategories ?? data ?? [];

    const handleBackClick = () =>{
        if(parentCategories){
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    const handleOpenChange = (open:boolean) =>{
        setSelectedCategory(null)
        setParentCategories(null)
        onOpenChangeAction(open)
    }

    const handleCategoryClick = (category:CategoriesGetmanyOutput[1]) => {
        if(category.subcategories && category.subcategories.length >0){
            setParentCategories(category.subcategories as CategoriesGetmanyOutput)
            setSelectedCategory(category);
        } else {
            // This is a leaf category(no subcategories)
            if(parentCategories && selectedCategory){
                // This is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`)
            }else{
                // main category - navigate to /category
                if (category.slug === 'all'){
                    router.push("/")
                }else{
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false)
        }
    }

    const backgroundColor = selectedCategory?.color || "white"

    return(
        <Sheet
            open = {open}
            onOpenChange= {handleOpenChange}
        >
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor:backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories &&(
                        <button
                            onClick = {handleBackClick}
                            className = "w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        >
                            <ChevronLeftIcon className="size-4 mr-2"/>
                            Back
                        </button>
                    )}
                    {
                        currentCategories.map((category)=>(
                            <button
                                key={category.slug}
                                onClick = {()=>handleCategoryClick(category)}
                                className= "w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                            >
                                {category.name}
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <ChevronRightIcon className="size-4"/>
                                )}
                            </button>
                            ))
                    }
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
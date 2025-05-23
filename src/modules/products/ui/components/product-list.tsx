"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProuductCard } from "./project-card";

interface Props {
    category ? : string;
}

export const ProductList = ({category}:Props) => {
    const filters = useProductFilters()
    const trpc = useTRPC()
    const {data} = useSuspenseQuery(trpc.products.getMany.queryOptions({
        category,
        ...filters
    }))
    return(
        <div
            className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 x;:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
            {data?.docs.map((product)=>(
                <ProuductCard
                    key = {product.id}
                    id = {product.id}
                    name = {product.name}
                    imageUrl = {product.image?.url}
                    authorUsername = "antonio"
                    authorImageUrl = {undefined}
                    reviewRating = {3}
                    reviewCount = {3}
                    price = {product.price}
                />
            ))}
        </div>
    )
}

export const ProductListSkeleton = () => {
    return(
        <div>
            Loading ....
        </div>
    )
}
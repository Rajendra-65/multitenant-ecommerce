
import { ProductList } from "@/modules/products/ui/components/product-list";
import { getQueryClient,trpc } from "@/trpc/server";
import { HydrationBoundary,dehydrate } from "@tanstack/react-query";
import { ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { Suspense } from "react";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import { SearchParams } from "nuqs";
// import { params } from "@/modules/products/hooks/use-product-filters";
// // import { loadProductFilters } from "@/modules/products/hooks/use-product-filters";
import { loadProductFilters } from "@/modules/products/hooks/filters-loader";
import { ProductSort } from "@/modules/products/ui/components/product-sort";

interface Props{
    params: Promise<{
        category:string
    }>
    searchParams: Promise<SearchParams>
}



const Page = async({params,searchParams}:Props) => {

    const {category} = await params;
    const filters = await loadProductFilters(searchParams)
    console.log("category",category)
    console.log(filters)
    const {minPrice, maxPrice, tags} = filters
    console.log(minPrice,maxPrice, tags)

    const queryClient = getQueryClient();
    console.log("Hitted")
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category,
        ...filters
    }))

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
                    <p className="text-2xl font-medium">Curated For You</p>
                    <ProductSort/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
                    <div className = "lg:col-span-2 xl:col-span-2">
                        <div className="p-2">
                            <ProductFilters/>
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-6">
                        <Suspense fallback={<ProductListSkeleton/>}>
                            <ProductList category={category} />
                        </Suspense>  
                    </div>    
                </div> 
            </div>
        </HydrationBoundary>
    )
}

export default Page;
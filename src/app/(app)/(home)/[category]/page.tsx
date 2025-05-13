interface Props{
    params: Promise<{
        category:string
    }>
}

import { caller } from "@/trpc/server";

const Page = async({params}:Props) => {

    const { category } = await params;

    const products = await caller.products.getMany()

    return(
        <div>
            Category : {category}
            <br/>
            products : {JSON.stringify(products)}
        </div>
    )
}

export default Page;
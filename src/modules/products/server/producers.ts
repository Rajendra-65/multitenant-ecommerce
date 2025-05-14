import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import z from "zod"
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
    getMany: baseProcedure
    .input(
        z.object({
            category: z.string().nullable().optional(),
            minPrice : z.string().nullable().optional(),
            maxPrice : z.string().nullable().optional()
        }),
    )
    .query(async ({ctx,input}) => {

        const where : Where = {
            price:{}
        }

        if(input.minPrice){
            where.price = {
                ...where.price,
                greater_than_equal: input.minPrice
            }
        }

        if(input.maxPrice){
            where.price = {
                ...where.price,
                less_than_equal: input.maxPrice
            }
        }
        
        if(input.category){
            const categoriesData = await ctx.db.find({
                collection: "Categories",
                limit: 1,
                depth: 1,
                pagination:false,
                where:{
                    slug:{
                        equals: input.category
                    }
                }
            })

            

            const formattedData = categoriesData.docs.map(doc => ({
                    ...doc,
                    subcategories:(doc.subcategores?.docs ??[]).map((doc)=>({
                        ...(doc as Category ),
                        subcategories:undefined
                    }))
            }));

            const parentCategory = formattedData[0];
            const subCategories = []

            if(parentCategory){
                subCategories.push(
                    ...parentCategory?.subcategories?.map((subcategory)=>subcategory.slug)
                )
                where["category.slug"] = {
                    in : [parentCategory.slug, ...subCategories]
                }
            }
        }
        
        const data = await ctx.db.find({
            
            collection: "products",
            depth: 1, // Populate category, image
            where
        });

        

        return data
    })
})

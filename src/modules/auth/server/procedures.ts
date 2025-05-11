import {headers as getHeaders} from "next/headers"
import { baseProcedure, createTRPCRouter } from "@/trpc/init";


export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ctx}) => {
        const headers = await getHeaders()

        const session = await ctx.db.auth({headers})

        return session
    })
})

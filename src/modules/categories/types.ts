import {inferRouterOutputs} from "@trpc/server"

import type { AppRouter } from "@/trpc/routers/_app"

export type CategoriesGetmanyOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"]

export type CategoriesGetManyOutputSingle = CategoriesGetmanyOutput[0]
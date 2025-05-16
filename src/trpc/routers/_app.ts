import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/producers';
import { productsRouter } from '@/modules/products/server/producers';
import { tagsRouter } from '@/modules/tags/server/producer';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  products: productsRouter,
  categories:categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
import { createTRPCRouter, publicProcedure } from "../trpc";

export const fileRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return 'files'
  }),
  create: publicProcedure.mutation(({ ctx }) => {
    return 'creating file'
  }),
})

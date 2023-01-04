//grab the images for the corresponding user
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const entryRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany({ where: { userId: ctx.user.id } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        entryDay: z.date(),
        urlFrontPhotoThumbnail: z.string(),
        urlFrontPhotoHD: z.string(),
        urlBackPhotoThumbnail: z.string(),
        urlBackPhotoHD: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      //create entry and link it to the user
      return ctx.prisma.entry.create({
        data: {
          entryDay: input.entryDay,
          urlFrontPhotoThumbnail: input.urlFrontPhotoThumbnail,
          urlFrontPhotoHD: input.urlFrontPhotoHD,
          urlBackPhotoThumbnail: input.urlBackPhotoThumbnail,
          urlBackPhotoHD: input.urlBackPhotoHD,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
});

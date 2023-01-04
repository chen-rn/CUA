import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

//this is a middleware that checks if the user is authenticated
//middleware: https://trpc.io/docs/middlewares
//TLDR: middleware is a function that runs before the procedure
//and can modify the context.

//What is a context? https://trpc.io/docs/context
//but TLDR: context is an object that is passed to every procedure
//and can be modified by middleware
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

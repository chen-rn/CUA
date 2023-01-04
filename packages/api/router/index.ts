import { router } from "../trpc";
import { entryRouter } from "./entry";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  entry: entryRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

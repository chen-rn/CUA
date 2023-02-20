import { prisma } from "@my/db";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
//import { getAuth, clerkClient } from "@clerk/nextjs/server";

import type { User } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your user/db

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type IUserProps = {
  user: User | null;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({ user }: IUserProps) => {
  return {
    user,
    prisma,
  };
};

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  // Create authenticated Supabase Client.
  const supabaseServerClient = createServerSupabaseClient({ req, res });

  async function getUser() {
    // get userId from request
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();

    //clerk code:
    //const { userId } = getAuth(opts.req);
    //get full user object
    //const user = userId ? await clerkClient.users.getUser(userId) : null;
    return user;
  }

  const user = await getUser();

  return await createContextInner({ user });
};

export type Context = inferAsyncReturnType<typeof createContext>;

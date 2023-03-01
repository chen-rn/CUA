import { HomeScreen } from 'app/features/home/screen'
import { buildClerkProps, clerkClient, getAuth } from "@clerk/nextjs/server";

// Use getServerSideProps to get the Clerk user
// When rendering the page on the server, the Clerk user context will be available immediately in:
//   <SignedIn, SignedOut, useAuth, useSignIn, useSignUp, useUser> imported from "app/utils/clerk"
export const getServerSideProps = async ({ req }: any) => {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  return { props: { ...buildClerkProps(req, { user }) } };
};

export default HomeScreen

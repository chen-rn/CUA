import {
  OAuthStrategy,
  SetSession,
  SignUpResource,
  SignInResource,
} from "@clerk/types";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const handleOAuthSignUp = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signUp: SignUpResource
) => {
  try {
    await signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: `${getBaseUrl()}/signup/sso-oauth/${strategy}`,
      redirectUrlComplete: `${getBaseUrl()}/signup/sso-oauth/${strategy}`,
    });

    //get session
    const { createdSessionId } = signUp;
    if (!createdSessionId) {
      throw "Something went wrong during the Sign up flow. Please ensure that all sign up requirements are met.";
    }
    await setSession(createdSessionId);
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing up with oauth on web", err);
  }
};

export const handleOAuthSignIn = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signIn: SignInResource
) => {
  try {
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: `${getBaseUrl()}/signup`,
      redirectUrlComplete: `${getBaseUrl()}/`,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing in with oauth on web", err);
  }
};

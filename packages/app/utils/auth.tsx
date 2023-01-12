import * as AuthSession from "expo-auth-session";
import {
  OAuthStrategy,
  SetSession,
  SignUpResource,
  SignInResource,
} from "@clerk/types";

export const handleOAuthSignUp = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signUp: SignUpResource
) => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({
      path: "/sso-oauth",
      //this isn't gonna work any since we are not using the *real url that starts with expo://
      //but that's okay, since we are going to handle the redirect ourselves
    });

    await signUp.create({
      strategy: strategy,
      redirectUrl: redirectUrl,
    });

    const {
      verifications: {
        externalAccount: { externalVerificationRedirectURL },
      },
    } = signUp;

    const result = await AuthSession.startAsync({
      authUrl: externalVerificationRedirectURL!.toString(),
      returnUrl: redirectUrl,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { type, params } = result || {};
    if (type !== "success") {
      throw "Something went wrong during the OAuth flow. Try again.";
    }

    // Get the rotatingTokenNonce from the redirect URL parameters
    const { rotating_token_nonce: rotatingTokenNonce } = params;

    await signUp.reload({ rotatingTokenNonce });

    const { createdSessionId } = signUp;

    if (!createdSessionId) {
      throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign in requirements are met.";
    }

    await setSession(createdSessionId);

    return;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing up", err);
  }
};
export const handleOAuthSignIn = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signIn: SignInResource
) => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({
      path: "/oauth-native-callback",
    });
    //option is either discord, google, or apple
    //switch statement to handle each option

    await signIn.create({
      strategy: strategy,
      redirectUrl,
    });

    const {
      firstFactorVerification: { externalVerificationRedirectURL },
    } = signIn;

    const result = await AuthSession.startAsync({
      authUrl: externalVerificationRedirectURL!.toString(),
      returnUrl: redirectUrl,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { type, params } = result || {};
    console.log;
    if (type !== "success") {
      throw "Something went wrong during the OAuth flow. Try again.";
    }

    // Get the rotatingTokenNonce from the redirect URL parameters
    const { rotating_token_nonce: rotatingTokenNonce } = params;

    await signIn.reload({ rotatingTokenNonce });

    const { createdSessionId } = signIn;

    if (!createdSessionId) {
      throw "Something went wrong during the Sign in OAuth flow. Please ensure that all sign in requirements are met.";
    }

    await setSession(createdSessionId);

    return;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing in", err);
  }
};

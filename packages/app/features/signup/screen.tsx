import { YStack } from "@my/ui";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
import { supabase, supabaseUrl } from "app/utils/supabase";
import { trpc } from "app/utils/trpc";

export function SignUpScreen() {
  const createUserMutation = trpc.user.create.useMutation();
  const { push } = useRouter();

  const handleOAuthSignUpWithPress = async (strategy: any) => {
    /* push("/signup/sso-oauth/" + strategy); */
    /*    const result = await supabase.auth.signInWithOAuth({
      provider: strategy,
    }); */
    MobileOAuthSignIn({ strategy });
  };

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    //push("/signup/email-verification");
    const { data, error } = await supabase.auth.signUp({
      email: emailAddress,
      password: password,
    });
    if (error) {
      alert(error.message);
    } else {
      //a pop up alert for check your email
      alert("Check your email for a verification link!");

      /* add email and their user id to our db w/ trpc */
      if (data?.user?.id && data?.user?.email) {
        createUserMutation.mutate({
          id: data?.user?.id,
          email: data?.user?.email,
        });
      } else {
        //give an error that is User created but not added to database
        alert("User created but not added to database");
      }

      push("/");
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignUpWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  );
}
import { makeRedirectUri, startAsync } from "expo-auth-session";

export const MobileOAuthSignIn = async ({ strategy }) => {
  // This will create a redirectUri
  // This should be the URL you added to "Redirect URLs" in Supabase URL Configuration
  // If they are different add the value of redirectUrl to your Supabase Redirect URLs
  const redirectUri = makeRedirectUri({
    scheme: "scheme",
    path: "sso-oauth",
  });

  /*   const redirectUrl = makeRedirectUri({
    path: "/auth/callback",
  }); */

  // authUrl: https://{YOUR_PROJECT_REFERENCE_ID}.supabase.co
  // returnURL: the redirectUrl you created above.
  const authResponse = await startAsync({
    authUrl: `${supabaseUrl}/auth/v1/authorize?provider=${strategy}&redirect_to=${redirectUri}`,
    returnUrl: redirectUri,
  });

  // If the user successfully signs in
  // we will have access to an accessToken and an refreshToken
  // and then we'll use setSession (https://supabase.com/docs/reference/javascript/auth-setsession)
  // to create a Supabase-session using these token
  if (authResponse.type === "success") {
    supabase.auth.setSession({
      access_token: authResponse.params.access_token!,
      refresh_token: authResponse.params.refresh_token!,
    });
  }
};

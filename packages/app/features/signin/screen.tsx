import { YStack } from "@my/ui";
import { useAuth, useSignIn } from "app/utils/clerk";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
import { handleOAuthSignIn } from "app/utils/auth";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export function SignInScreen() {
  const { push } = useRouter();

  const { isLoaded, signIn, setSession } = useSignIn();
  const { userId } = useAuth();

  if (userId) {
    push("/");
    return null;
  }

  if (!setSession) return null;
  if (!isLoaded) return null;

  const redirectIfSignedIn = async () => {
    if (signIn.status == "complete") {
      push("/");
    }
  };

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignIn(strategy, setSession, signIn);
    await redirectIfSignedIn();
  };

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    await signIn.create({
      identifier: emailAddress,
      password,
    });
    await redirectIfSignedIn();
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  );
}

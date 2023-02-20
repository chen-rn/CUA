import { YStack } from "@my/ui";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
//import { handleOAuthSignIn } from "app/utils/auth";
import { supabase } from "app/utils/supabase";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export function SignInScreen() {
  const { push } = useRouter();

  const handleOAuthSignInWithPress = async (strategy: any) => {};

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password: password,
    });
    if (error) {
      alert(error.message);
    }
    if (data) {
      push("/");
    }
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

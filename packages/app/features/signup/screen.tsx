import { YStack } from "@my/ui";
import { useAuth, useSignUp } from "app/utils/clerk";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";

export function SignUpScreen() {
  const { push } = useRouter();

  const { userId } = useAuth();
  const { isLoaded, signUp, setSession } = useSignUp();

  if (userId) {
    push("/");
    return null;
  }

  if (!setSession || !isLoaded) return null;

  const handleOAuthSignUpWithPress = async (strategy: OAuthStrategy) => {
    push("/signup/sso-oauth/" + strategy);
  };

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    await signUp.create({
      emailAddress,
      password,
    });

    await signUp.prepareEmailAddressVerification();
    push("/signup/email-verification");
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

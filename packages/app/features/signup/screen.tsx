import { YStack } from "@my/ui";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
import { supabase } from "app/utils/supabase";
import { trpc } from "app/utils/trpc";

export function SignUpScreen() {
  const createUserMutation = trpc.user.create.useMutation();
  const { push } = useRouter();

  const handleOAuthSignUpWithPress = async (strategy: any) => {
    push("/signup/sso-oauth/" + strategy);
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
      alert("Check your email for verification code");

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

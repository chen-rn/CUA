import { YStack } from '@my/ui'
import { handleOAuthSignUp } from 'app/utils/auth'
import { useSignUp } from 'app/utils/clerk'
import { OAuthStrategy } from '@clerk/types'
import { useRouter } from 'solito/router'
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn'

export function SignUpScreen() {
  const { push } = useRouter()

  const { isLoaded, signUp, setSession } = useSignUp()

  if (!setSession) return null
  if (!isLoaded) return null

  const handleOAuthSignUpWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignUp(strategy, setSession, signUp)
  }

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    console.log('emailAddress', emailAddress)
    console.log('password', password)
    await signUp.create({
      emailAddress,
      password,
    })

    await signUp.prepareEmailAddressVerification()
    push('/signup/email-verification')
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignUpWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  )
}

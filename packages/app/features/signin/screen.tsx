import { YStack } from '@my/ui'
import { useSignIn } from 'app/utils/clerk'
import { OAuthStrategy } from '@clerk/types'
import { useRouter } from 'solito/router'
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn'
import { handleOAuthSignIn } from 'app/utils/auth'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export function SignInScreen() {
  const { push } = useRouter()

  const { isLoaded, signIn, setSession } = useSignIn()
  if (!setSession) return null
  if (!isLoaded) return null

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    handleOAuthSignIn(strategy, setSession, signIn)
  }

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    await signIn.create({
      identifier: emailAddress,
      password,
    })

    const { createdSessionId } = signIn

    if (!createdSessionId) {
      throw 'Something went wrong during the Sign in flow. Please ensure that all sign in requirements are met.'
    }

    await setSession(createdSessionId)

    push('/')
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  )
}

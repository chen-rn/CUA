import React from 'react'
import { Paragraph, YStack } from '@my/ui'
import { SignIn } from '@clerk/nextjs'

export function SignInScreen() {
  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </YStack>
  )
}

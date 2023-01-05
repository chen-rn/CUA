import React from 'react'
import { View } from 'react-native'
import { Paragraph, Stack, Text, YStack } from '@my/ui'
import { SignIn } from '@clerk/clerk-react'
import { Platform } from 'react-native'

export function SignInScreen() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      {Platform.OS === 'web' ? (
        <SignIn />
      ) : (
        <View>
          <Text>Sign in</Text>
        </View>
      )}
    </YStack>
  )
}

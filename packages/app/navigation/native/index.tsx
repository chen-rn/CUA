import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { SignInScreen } from '../../features/signin/screen'
import { SignUpScreen } from '../../features/signup/screen'
import { EmailVerificationScreen } from '../../features/signup/email-verification/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  signin: undefined
  signup: undefined
  'email-verification': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="signin"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="email-verification"
        component={EmailVerificationScreen}
        options={{
          title: 'Email Verification',
        }}
      />
    </Stack.Navigator>
  )
}

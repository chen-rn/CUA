import { Anchor, Button, H1, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'
import { trpc } from '../../utils/trpc'
import { SignedIn, SignedOut, useAuth, useSignIn, useSignUp } from '../../utils/clerk'

export function HomeScreen() {
  const { signOut, userId } = useAuth()
  const userLinkProps = useLink({
    href: '/user/nate',
  })
  const signInLinkProps = useLink({
    href: '/signin',
  })
  const signUpLinkProps = useLink({
    href: '/signup',
  })

  const { data, isLoading, error } = trpc.entry.all.useQuery()

  useEffect(() => {
    console.log(data)
  }, [isLoading])
  /* 
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  } */

  if (error) {
    return <Paragraph>{error.message}</Paragraph>
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>
      {data?.map((entry) => (
        <Paragraph key={entry.id}>{entry.id}</Paragraph>
      ))}

      <Paragraph>{userId}</Paragraph>
      <SignedIn>
        {/* sign out button */}
        <Button
          onPress={() => {
            signOut()
          }}
        >
          Sign Out
        </Button>
      </SignedIn>
      <XStack>
        <Button {...userLinkProps} theme={'red'} mr="$4">
          Link to User
        </Button>
        <YStack>
          <Button {...signInLinkProps} theme={'blue'}>
            Link to Sign In
          </Button>
          <Button {...signUpLinkProps} theme={'gray'}>
            Link to Sign Up
          </Button>
        </YStack>
      </XStack>
      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

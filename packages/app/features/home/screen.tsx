import { Anchor, Button, H1, Paragraph, Separator, Sheet, Text, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'
import { trpc } from '../../utils/trpc'
import { SignedIn, SignedOut, useAuth, useSignIn, useSignUp } from '../../utils/clerk'
import { Card, CardHeader, H3, Image } from 'tamagui' // or @tamagui/card

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
        <H1 ta="center">create-universal-app</H1>
        <Paragraph ta="left">
          This is a demo for create-universal-app. To read more about the philosophy behind it,
          visit{' '}
          <Anchor
            color="$color12"
            href="https://github.com/chen-rn/create-universal-app"
            target="_blank"
          >
            https://github.com/chen-rn/create-universal-app
          </Anchor>{' '}
          and give it a ⭐️ on github!
        </Paragraph>
        <Separator />
        <Paragraph>
          On a high level, this is a template designed for you to build a universal app(web +
          mobile) in one code base without sacrificing 1. Performance and 2. Developer Experience.
          It uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and Prisma. If you're a beginner and is
          a little overwhelmed, I've also made a{' '}
          <Anchor
            color="$color12"
            href="https://www.youtube.com/watch?v=6Z4p-qjnKCQ"
            target="_blank"
          >
            video
          </Anchor>{' '}
          explanation on how this template works and how to get started!
        </Paragraph>
        <Separator />
      </YStack>

      <H3 ta="center">Some Demos</H3>
      <YStack p={'$2'}>
        <Paragraph>TRPC Demo</Paragraph>
        {data?.map((entry) => (
          <Paragraph key={entry.id}>{entry.id}</Paragraph>
        ))}
      </YStack>

      <XStack space>
        <Paragraph>Routing Demo</Paragraph>
        <Button {...userLinkProps} theme={'gray'}>
          User Page
        </Button>
      </XStack>

      <XStack space ai="center">
        <Paragraph>Clerk/Auth Demo</Paragraph>
        <YStack space>
          <Button {...signInLinkProps} theme={'gray'}>
            Sign In
          </Button>
          <Button {...signUpLinkProps} theme={'gray'}>
            Sign Up
          </Button>
        </YStack>
      </XStack>

      <SignedIn>
        <Button
          onPress={() => {
            signOut()
          }}
        >
          Sign Out
        </Button>
      </SignedIn>
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

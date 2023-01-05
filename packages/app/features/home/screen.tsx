import { Anchor, Button, H1, Input, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'
/* import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { useAuth } from '@clerk/clerk-expo' */
import { trpc } from '../../utils/trpc'

export function HomeScreen() {
  /* const { signOut } = useAuth() */
  const linkProps = useLink({
    href: '/user/nate',
  })

  const { data, isLoading, error } = trpc.entry.all.useQuery()

  useEffect(() => {
    console.log(data)
  }, [isLoading])

  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
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

      <Paragraph>hihi how r u</Paragraph>
      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>
      <SheetDemo />
      {/* sign out button */}
      <Button
        onPress={() => {
          signOut()
        }}
      >
        Sign Out
      </Button>
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

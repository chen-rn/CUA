import {
  Anchor,
  Button,
  H1,
  H3,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Image,
} from "@my/ui";
import React, { useState, useEffect } from "react";
import { useRouter } from "solito/router";
import { supabase } from "app/utils/supabase";
import { Session } from "@supabase/supabase-js";

export function HomeScreen() {
  const { push } = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} px="$3">
        <XStack jc="center" ai="flex-end" fw="wrap" space="$2" mt="$-2">
          <Image
            src="https://raw.githubusercontent.com/chen-rn/CUA/main/apps/nextjs/public/favicon.ico"
            accessibilityLabel="create-universal-app logo"
            width={50}
            height={50}
            mt="$2"
          />
          <H1 ta="center" mt="$2">
            create-universal-app
          </H1>
        </XStack>
        <Paragraph ta="center">
          This is a demo for create-universal-app. To read more about the
          philosophy behind it, visit{" "}
          <Anchor
            color="$color12"
            href="https://github.com/chen-rn/create-universal-app"
            target="_blank"
          >
            https://github.com/chen-rn/create-universal-app
          </Anchor>
          (give it a ⭐️ if you like it!)
        </Paragraph>
        <Paragraph ta="center">
          This template uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and
          Prisma. If you're a beginner and is a little overwhelmed, I've also
          made a{" "}
          <Anchor
            color="$color12"
            href="https://youtu.be/aTEv0-ZBbWk"
            target="_blank"
          >
            video
          </Anchor>
          explanation on how this template works and how to get started!
        </Paragraph>
        <Separator />
      </YStack>

      <H3 ta="center">Some Demos</H3>
      <YStack p="$2">
        <Paragraph>tRPC Query Demo</Paragraph>
      </YStack>

      <Button
        onPress={() => {
          push("/user/nate");
        }}
      >
        User Page(Routing)
      </Button>

      {session ? (
        <Button
          onPress={() => {
            supabase.auth.signOut();
          }}
        >
          Sign Out
        </Button>
      ) : (
        <XStack space>
          <Button
            onPress={() => {
              push("/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            onPress={() => {
              push("/signin");
            }}
          >
            Sign In
          </Button>
        </XStack>
      )}
    </YStack>
  );
}

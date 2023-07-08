import { styled, YStack } from 'tamagui'


export const MyComponent = styled(YStack, {
  name: 'MyComponent',
  // @ts-ignore
  bc: 'red',
  // @ts-ignore
  variants: {
    blue: {
      true: {
        backgroundColor: 'blue',
      },
    },
  } as const,
})

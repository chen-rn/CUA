# work in progress

# create-universal-app
An opinionated template for creating universal apps(Expo, Next, tRPC, Prisma, Tamagui, Clerk Auth)

Why Tamagui?
- what is Tamagui? TLDR: it's for making things look pretty on both web and mobile while being really really fast and easy to work with.
- Tamagui has 3 things. 1. Compiler 2. Core 3. UI
  - 1 is their unique way of turning your "style related code" into pure CSS faster. Most important thing here is probably this tree flattening thing they do.
  - 2 is a small set of components they built aimed to replace <View> and <Text> that you one uses in RN, with some advantages.
  - 3 is a set of UI components that the tama team built using #2.
  - if you want a bit more detail, either visit their website or join discord channel or ask ChatGPT(I admit it's not the simplest thing out there)
- why not native wind?
  - honestly this is kinda 50/50 for me at this moment. Feel free to use Nativewind instead of Tama. You can surely use both as well if you feel like.

Why Clerk?
- how is it different from firebase/supabase/all the other auth solutions?
- high level: Clerk is user management. Instant set up. Generous free tier.
- practical things I like:
  - Really nice hooks/components(SignedIn/SignedOut) that work for both Expo and Web
  - Fantastic support(personal experience)
- downside:
  - start up: die in a few years
  - doesn't do SMS unless you pay, big negative for mobile, but it makes up for it with easy oauth.

Credits:
- create-t3-turbo
- tamagui + solito starter
- t3-turbo-and-clerk

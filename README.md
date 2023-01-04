# 🌌 create-universal-app(🏗️ WIP)

## 🤨 What is this?
This is an opinionated template for creating universal(mobile + web codeshare) apps with built in auth for both mobile and web using Expo(mobile), Next(web), tRPC, Prisma, Tamagui(ui/styling), and Clerk(mobile + web auth).


**Giants whom we are standing on the shoulders of**
- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)(expo, next, trpc, prisma, nextauth - all in one, but no UI code share, no mobile auth)
- [t3-turbo-and-clerk](https://github.com/clerkinc/t3-turbo-and-clerk)(t3 turbo, but with auth for mobile + web, still no code share for UI)
- [tamagui + solito starter](https://github.com/tamagui/tamagui/tree/master/starters/next-expo-solito)(expo + next code share, but no tRPC, no built in auth)

## 🌟 How it works
- Your **frontend** code will be coded in React Native Web inside of /packages/UI, meaning that you're going to write Views instead of divs.(Note: since we are using Tamagui, we're gonna write XStacks instead Views)
  - If you're familiar with React Native, it's going to feel as if you're writing a React Native app, that just happens to also run really well on the web(with SSR and all of those goodies).
  - This code will get rendered to HTML/CSS on the NextJS side and normal RN code on the Expo side.(with the help of Solito)
- Your **backend** code is gonna be in "packages/api". This code is actually gonna get ran by your web framework NextJS, in the backend. If you're a little confused about how that works, [here's](https://www.youtube.com/watch?v=2cB5Fh46Vi4&t=1017s) a good video by Theo that talks about NextJS as a backend framework.
  - Also note, you don't need to understanding how everything works in detail before you can start using something like this. As someone that wants to know how every bolt and nut works, I often get "blocked" by my own perfectionism, so I'm just throwing this out there in case you're feeling the same about something.
- Your backend and frontend will communicate with tRPC.
- Your backend and your DB will communicate with Prisma(ORM).
- Mobile auth is done with Clerk Expo, and web auth is done with Clerk React and Clerk Next.

## 💭 Behind the decisions
**Why Tamagui for style/ui?**
- what is Tamagui? -> TLDR: it's for making things look pretty on both web and mobile while being really really fast and easy to work with.
- In a bit more detail, Tamagui has 3 things. 1. Compiler 2. Core 3. UI
  - 1 is their unique way of turning your "style related code" into pure CSS faster. Most important thing here is probably this tree flattening thing they do.
  - 2 is a small set of components they built aimed to replace <View> and <Text> that you one uses in RN, with some advantages.
  - 3 is a set of UI components that the tama team built using #2.
  - if you want a bit more detail, either visit their website or join discord channel or ask ChatGPT(I admit it's not the simplest thing out there)
- why not Nativewind/Tailwind?
  - What I like about Tamagui is that it's simultaneously Tailwind and DaisyUI that's built from the ground up designed for universal apps with its own compiler and core components. Hence why I'm willing to commit a new learning period to it, the same one that I commited to Tailwind years back.
  - In terms of "speed of development", personally I'm using Tailwind, I'm really just writing shorthand inline styles, which is not all that diff from adding in style props in Tamagui.(I'm lazy and don't use a lot of the _deeper_ features of Tailwind.) The other speed save comes from skipping the "naming" of classes, which neither of these require.
    - (TBH, copilot + autocomplete makes old fasion style = {{}} inline stles not that bad either)
  - So, this one is kinda 60/40 for me. Feel free to use Nativewind/Tailwind instead of Tama.


**Why Clerk for auth?**
- practical things I like about Clerk:
  - Really nice hooks/components(SignedIn/SignedOut) that work for both Expo and NextJs
  - SDKs for all 3 sides: Expo frontend, NextJs frontend, NextJs serverside
  - Fantastic support/help from their team(personal experience)
- downside:
  - doesn't do SMS unless you pay: big negative for mobile, but imo makes up for it with easy oauth.
  - premium plan is also expensive compared to the alternatives
  - double edged sword of being a start up
- On a high level, clerk promises an overall user management solution instead of just authentication with things like User Profile, Banning, Device management and stuff all built in. But in practice, I've just personally had an great time using Clerk for Expo compared to Firebase/Supabase auth for my projects.


**Which DB?**
- I recommend either spin up a postgres instance on Railway or use Supabase, doesn't matter too much IMO.

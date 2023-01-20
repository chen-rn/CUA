import 'expo-dev-client'
import React from 'react'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import {SplashScreen, Stack} from 'expo-router'


export default function App() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    if (!loaded) {
        return <SplashScreen />
    }

    return (
        <Provider>
            <Stack/>
        </Provider>
    )
}

import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Stack } from "expo-router";
import { colors } from "@/styles/theme";
import { Loading } from "@/components/loading";

import {
    useFonts,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold

} from "@expo-google-fonts/rubik";

export default function Layout() {
    const [isFontLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_600SemiBold,
        Rubik_700Bold
    })

    if (!isFontLoaded) return <Loading />;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="default" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.gray[100],
                    },

                }}
            />
        </GestureHandlerRootView>
    )
}
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomBar from "./BottomBar";

export default function Layout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            <BottomBar />
        </View>
    );
}
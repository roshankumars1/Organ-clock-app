import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomBar() {
    const router = useRouter();
    return (
        <View style={styles.buttonBar}>
            <Button title="Home" onPress={() => router.push("/")} />
            <Button title="Log Activity" onPress={() => router.push("/LogActivity")} />
            <Button title="Log History" onPress={() => router.push("/LogHistory")} />
            <Button title="User Profile" onPress={() => router.push("/UserProfile")} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
    },
});
import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function UserProfileScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>User Profile</Text>
            <Text>Name: John Doe</Text>
            <Text>Phone: 123-456-7890</Text>
            <Button title="Back" onPress={() => router.back()} />
        </View>
    );
}
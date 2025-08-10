import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type LogEntry = {
    activity: string;
    time: Date;
    note: string;
};

const logs: LogEntry[] = [
    { activity: "Eat", time: new Date(), note: "Breakfast" },
    { activity: "Sleep", time: new Date(), note: "Nap" },
];

export default function LogHistoryScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Log History</Text>
            <FlatList
                data={logs}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.activity}>{item.activity}</Text>
                        <Text style={styles.time}>{item.time.toLocaleTimeString()}</Text>
                        <Text style={styles.note}>{item.note}</Text>
                    </View>
                )}
            />
            <Button title="Back" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    activity: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
    time: { fontSize: 16, color: "#333", marginTop: 4 },
    note: { fontSize: 14, color: "#666", marginTop: 2 },
});
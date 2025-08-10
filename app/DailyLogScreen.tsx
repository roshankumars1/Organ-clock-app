import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getLogEntries } from "./storage";

export default function DailyLogScreen() {
    const { date } = useLocalSearchParams();
    const router = useRouter();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const storedLogs = await getLogEntries();
            const filtered = storedLogs.filter(
                log => new Date(log.time).toLocaleDateString() === date
            );
            setLogs(filtered);
        };
        fetchLogs();
    }, [date]);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Activities on {date}
            </Text>
            <FlatList
                data={logs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.activity}>{item.activity}</Text>
                        <Text style={styles.time}>
                            {new Date(item.time).toLocaleTimeString()}
                        </Text>
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

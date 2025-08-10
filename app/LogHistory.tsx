import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getLogEntries } from "./storage";

export default function LogHistoryScreen() {
    const router = useRouter();
    const [dateGroups, setDateGroups] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const storedLogs = await getLogEntries();

            // Group logs by date
            const grouped = storedLogs.reduce((acc, log) => {
                const dateOnly = new Date(log.time).toLocaleDateString();
                if (!acc[dateOnly]) {
                    acc[dateOnly] = [];
                }
                acc[dateOnly].push(log);
                return acc;
            }, {});

            // Convert object to sorted array [{date, logs}]
            const groupedArray = Object.keys(grouped)
                .map(date => ({ date, logs: grouped[date] }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));

            setDateGroups(groupedArray);
        };
        fetchLogs();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Log History</Text>
            {dateGroups.length === 0 ? (
                <Text>No activity logs found.</Text>
            ) : (
                <FlatList
                    data={dateGroups}
                    keyExtractor={(item) => item.date}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push({
                                pathname: "/DailyLogScreen",
                                params: { date: item.date }
                            })}
                        >
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Text style={styles.countText}>
                                {item.logs.length} activities
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}
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
    dateText: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
    countText: { fontSize: 14, color: "#333", marginTop: 4 }
});

import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { saveLogEntry } from "./storage";

const activities = ["Eat", "Sleep", "Exercise", "Work"];

export default function LogActivityScreen() {
    const router = useRouter();
    const [selectedActivity, setSelectedActivity] = useState(activities[0]);
    const [activityTime, setActivityTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [activityNote, setActivityNote] = useState("");

    const handleTimeChange = (_: DateTimePickerEvent, time?: Date) => {
        setShowTimePicker(false);
        if (time) setActivityTime(time);
    };

    const handleSave = async () => {
        if (!selectedActivity) return;
        const entry = {
            activity: selectedActivity,
            time: activityTime.toISOString(),
            note: activityNote,
            id: Date.now().toString(),
        };

        await saveLogEntry(entry); // save persistently
        router.back(); // navigate back after saving
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Activity</Text>
            {activities.map((act) => (
                <TouchableOpacity key={act} onPress={() => setSelectedActivity(act)}>
                    <Text
                        style={{
                            padding: 8,
                            backgroundColor: selectedActivity === act ? "#ddd" : "#fff",
                            marginVertical: 2,
                            borderRadius: 4,
                        }}
                    >
                        {act}
                    </Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text style={{ marginVertical: 10 }}>
                    Time: {activityTime.toLocaleTimeString()}
                </Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={activityTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}

            <TextInput
                placeholder={`Note for ${selectedActivity}`}
                value={activityNote}
                onChangeText={setActivityNote}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    marginVertical: 10,
                    padding: 8,
                    borderRadius: 4,
                }}
            />

            <Button title="OK" onPress={handleSave} />
            <Button title="Cancel" onPress={() => router.back()} color="red" />
        </View>
    );
}

import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGS_KEY = 'user_activity_logs';

export async function saveLogEntry(entry) {
    try {
        const existingLogs = await AsyncStorage.getItem(LOGS_KEY);
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(entry);
        await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    } catch (error) {
        console.error('Failed to save log', error);
    }
}

export async function getLogEntries() {
    try {
        const logs = await AsyncStorage.getItem(LOGS_KEY);
        return logs ? JSON.parse(logs) : [];
    } catch (error) {
        console.error('Failed to retrieve logs', error);
        return [];
    }
}

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get('window');
const clockSize = Math.min(width, height) * 0.8;

export default function HomeScreen() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getRotation = (unit, max) => {
        return (unit / max) * 360;
    };

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourRotation = getRotation(hours + minutes / 60, 12);
    const minuteRotation = getRotation(minutes + seconds / 60, 60);
    const secondRotation = getRotation(seconds, 60);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>

            <View style={styles.clockContainer}>
                {/* Clock Background Image - Replace 'clock-background' with your actual image source */}
                <Image
                    source={require('../assets/images/img.png')} // Replace with your image path
                    style={styles.clockBackground}
                    resizeMode="cover"
                />

                {/* Clock Center Dot */}
                <View style={styles.centerDot} />

                {/* Hour Hand */}
                <View
                    style={[
                        styles.hand,
                        styles.hourHand,
                        { transform: [{ rotate: `${hourRotation}deg` }] }
                    ]}
                />

                {/* Minute Hand */}
                <View
                    style={[
                        styles.hand,
                        styles.minuteHand,
                        { transform: [{ rotate: `${minuteRotation}deg` }] }
                    ]}
                />

                {/* Second Hand */}
                <View
                    style={[
                        styles.hand,
                        styles.secondHand,
                        { transform: [{ rotate: `${secondRotation}deg` }] }
                    ]}
                />
            </View>

            {/* Digital Time Display */}
            <Text style={styles.digitalTime}>
                {time.toLocaleTimeString()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
        paddingVertical: 50,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#007AFF",
        marginBottom: 40,
    },
    clockContainer: {
        width: clockSize,
        height: clockSize,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    clockBackground: {
        width: clockSize,
        height: clockSize,
        borderRadius: clockSize / 2,
        position: 'absolute',
    },
    centerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#333',
        position: 'absolute',
        zIndex: 10,
    },
    hand: {
        position: 'absolute',
        backgroundColor: '#333',
        transformOrigin: '50% 100%',
        borderRadius: 2,
    },
    hourHand: {
        width: 6,
        height: clockSize * 0.25,
        bottom: clockSize / 2,
        left: clockSize / 2 - 3,
    },
    minuteHand: {
        width: 4,
        height: clockSize * 0.35,
        bottom: clockSize / 2,
        left: clockSize / 2 - 2,
    },
    secondHand: {
        width: 2,
        height: clockSize * 0.4,
        bottom: clockSize / 2,
        left: clockSize / 2 - 1,
        backgroundColor: '#FF0000',
    },
    digitalTime: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
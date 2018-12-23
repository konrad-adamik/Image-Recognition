import React from "react"
import { View, Text, StyleSheet } from "react-native"

const HomeScreenText = () => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Welcome!</Text>
            <Text style={styles.textStyle}>Please select the source of image!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        paddingTop: 15,
    },
    textStyle: {
        textAlign: "center",
        fontSize: 18,
        paddingBottom: 5,
    }
  });
  
export default HomeScreenText
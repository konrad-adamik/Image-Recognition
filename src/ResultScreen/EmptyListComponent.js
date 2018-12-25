import React from "react"
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native"

const EmptyListComponent = () => {
    return (
        <View style={styles.emptyListContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Waiting for server response...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyListContainer: {
        alignItems: 'center',
        justifyContent: "center",
        height: (Dimensions.get("window").height - Dimensions.get("window").width * 9 / 16 - 80)
    },
  });
  
export default EmptyListComponent
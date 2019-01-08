import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={require("../../assets/headerIcon.gif")} />
            <Text style={styles.headerText}>Image Recognition</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 25,
        height: 80,
        shadowColor: "#000000",
        shadowOffset: { height: 0, width: 2},
        shadowOpacity: 0.2,
        elevation: 2,

    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    headerImage: {
        alignItems: "center",
        height: 48,
        width: 48,
    }
  });
  

export default Header
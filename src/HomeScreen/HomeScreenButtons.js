import React from "react"
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"

const HomeScreenButtons = () => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.buttonStyle}
            >
                <Text style={styles.textStyle}>Camera</Text>
                <Image style={styles.imageStyle} source={require("../../assets/ico_camera.png")} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPress}
                containerStyle={styles.buttonStyle}
                style={styles.buttonStyle}
            >
                 <Text style={styles.textStyle}>Gallery</Text>
                 <Image style={styles.imageStyle} source={require("../../assets/ico_gallery.png")} />
            </TouchableOpacity>
        </View>
    )
}

function onPress() {
    console.log("pressed")
}

const styles = StyleSheet.create({
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingTop: 75,
        height: 300,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#668AF8',
        borderBottomWidth: 4,
        borderBottomColor: "#6272CC",
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 45,
        width: 225,
    },
    imageStyle: {
        height: 30,
        width: 30,
        marginLeft: 50,
        marginRight: 10,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: "bold",
    }
  });
  
export default HomeScreenButtons
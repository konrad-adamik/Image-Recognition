import React from "react"
import { View, TouchableOpacity, Text, StyleSheet, Image, Button, ActivityIndicator } from "react-native"
import { Actions } from "react-native-router-flux"
import { ImagePicker } from "expo"

export default class HomeScreenButtons extends React.Component {
    constructor(){
        super()
        this.pickImage = this._pickImage.bind(this)
        this.launchCamera = this._launchCamera.bind(this)
    }
    state = {
        isProcessingPhoto: false,
    }
    async _pickImage() {
        this.setState({isProcessingPhoto: true})
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64: true,
        });
        this.setState({isProcessingPhoto: false})
        if(!result.cancelled) {
            Actions.resultScreen({
                photoBase64: result.base64,
                photoURI: result.uri
            })
        } 
    };

    async _launchCamera() {
        this.setState({isProcessingPhoto: true})
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
          });
        if(!result.cancelled) {
            Actions.resultScreen({
                photoBase64: result.base64,
                photoURI: result.uri
            })
        }
        this.setState({isProcessingPhoto: false})
    }
    

    render () {
        if(this.props.cameraPermission && this.props.cameraRollPermission) {
            if(this.state.isProcessingPhoto) {
                return (
                <View style={styles.errorContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Processing Photo, Please Wait</Text>
                </View>
                )
                
            } else {
                return (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.launchCamera}
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.textStyle}>Camera</Text>
                            <Image style={styles.imageStyle} source={require("../../assets/ico_camera.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.pickImage}
                            containerStyle={styles.buttonStyle}
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.textStyle}>Gallery</Text>
                            <Image style={styles.imageStyle} source={require("../../assets/ico_gallery.png")} />
                        </TouchableOpacity>
                    </View>
                )
            }
            
        } else if (this.props.cameraPermission === null || this.props.cameraRollPermission === null) {
            return (
                <View />
            )
        } else {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.textStyle}>Necessary Permissions</Text>
                    <Text style={styles.textStyle}>Not Granted :(</Text>
                    <Button onPress={async () => { await this.props.requestPermissionsCallback()}} title="Request Permissions"></Button>
                </View>
                
            )
        }
    }     
}

const styles = StyleSheet.create({
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        height: 300,
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: "center",
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
        flexWrap: "wrap",
    }
  });
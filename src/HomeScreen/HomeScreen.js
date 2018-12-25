import React from "react";
import { StyleSheet, View } from "react-native";
import { Permissions } from 'expo';
import HomeScreenText from "./HomeScreenText"
import HomeScreenButtons from "./HomeScreenButtons"

export default class HomeScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
  };

  async componentDidMount() {
      await this.requestPermissions()
  }

  async requestPermissions() {
    const permissionStatus = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: permissionStatus.permissions.camera.status === 'granted' });
    this.setState({ hasCameraRollPermission: permissionStatus.permissions.cameraRoll.status === 'granted' });
  }

  render() {
    return (
      <View style={styles.container}>
        <HomeScreenText />
        <HomeScreenButtons 
            cameraPermission={this.state.hasCameraPermission}
            cameraRollPermission={this.state.hasCameraRollPermission}
            requestPermissionsCallback={this.requestPermissions.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

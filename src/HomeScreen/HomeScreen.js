import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "../Header/Header"
import HomeScreenText from "./HomeScreenText"
import HomeScreenButtons from "./HomeScreenButtons"

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText={"Emotions Recognition"} />
        <HomeScreenText />
        <HomeScreenButtons />
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

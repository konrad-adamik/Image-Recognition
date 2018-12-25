import React from "react"
import { View, Text, Image, StyleSheet, Dimensions, FlatList, ProgressBarAndroid } from "react-native"
import EmptyListComponent from "./EmptyListComponent"
import axios from "axios"

export default class ImagePickerScreen extends React.Component {
    constructor(){
        super()
        this.width = Dimensions.get('window').width;
        this.imageHeight = this.width * 9 / 16;
    }

   

    state = {
        resultData: [
            {
                key: "1",
                name: "Result1",
                value: 0.222222
            },
            {
                key: "2",
                name: "Result2",
                value: 0.25323
            },
            {
                key: "3",
                name: "Result3",
                value: 0.354324
            },
            {
                key: "4",
                name: "Result4",
                value: 0.45234
            },
            {
                key: "5",
                name: "Result5",
                value: 0.55234
            },
            {
                key: "6",
                name: "Result6",
                value: 0.65234
            },
        ]
    }

    render() {
      return (
        <View style={styles.listStyle} >
          <Image 
                style={{width: this.width, height: this.imageHeight}} 
                source={{uri: this.props.photoURI}} 
                resizeMode="cover"
                resizeMethod="scale"
            />
            <FlatList
                style={styles.listStyle}
                ListEmptyComponent={EmptyListComponent}
                data={this.state.resultData}
                renderItem={({item}) => (
                      <View style={styles.listItemStyle}>
                        <Text style={styles.textStyle}>{item.name + ": "}</Text>
                        <ProgressBarAndroid
                            style={styles.progressBarStyle}
                            styleAttr="Horizontal" 
                            color="#2196F3"
                            progress={item.value}
                            indeterminate={false}
                        />
                        <Text style={{paddingLeft: 10}}>{((item.value * 100 + "").substring(0,5) + " %")}</Text>
                      </View>
                  )}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    listStyle: {
        backgroundColor: "white"
    },
    listItemStyle: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: (Dimensions.get("window").height - Dimensions.get("window").width * 9 / 16 - 80) / 6
    },
    progressBarStyle: {
        width: Dimensions.get("window").width * 0.60
    },
    textStyle: {
        paddingRight: 10,
        fontSize: 14,
        fontWeight: "bold",
    }
  });

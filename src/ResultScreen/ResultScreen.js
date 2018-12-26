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
        resultData: []
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    parseResultNames(name) {
        if (name.includes("_")) {
            const splitName = name.split("_")
            return this.capitalizeFirstLetter(splitName[0]) + " " + splitName[1]
        } else {
            return this.capitalizeFirstLetter(name)
        }
    }

    truncateProbability(probability) {
        const splitProb = probability.split(".")
        return splitProb[0] + "." + splitProb[1].substring(0,2)
    }

    componentDidMount() {
        base64image = this.props.photoBase64.replace(/(?:\r\n|\r|\n)/g, '');
        const formData = new FormData();
        formData.append('data', base64image);

        axios({
        url: `http://192.168.1.200:5000/api/identify`,
        method: 'POST',
        data: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then(res => {
            const resultData = res.data.results.map(((result, index) => {
                return {
                    key: JSON.stringify(index),
                    name: this.parseResultNames(result.result),
                    value: parseFloat(result.probability)  
                }
            }))
            this.setState({resultData: resultData})
        })
        .catch(error => console.log(error))

    }

    renderHeader = () => {
        return (
            <View
              style={styles.listHeaderStyle}
            >
                <Text style={styles.textStyle}>Result Name</Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    alignItems: "center",
                    paddingLeft: 5,
                }}>Probability</Text>
            </View>
        )
    }

    renderSeparator = () => {
        return (
          <View
            style={styles.seperatorStyle}
          />
        )
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
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
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
                        <Text style={styles.textPercentStyle}>
                            {(this.truncateProbability((item.value * 100 + "")) + " %")}
                        </Text>
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
        flexDirection: "row",
        height: (Dimensions.get("window").height - Dimensions.get("window").width * 9 / 16 - 80) / 6,
        paddingLeft: 5
    },
    listHeaderStyle: {
        alignItems: "center",
        flexDirection: "row",
        height: (Dimensions.get("window").height - Dimensions.get("window").width * 9 / 16 - 80) / 6,
        paddingLeft: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#CED0CE",
    },
    seperatorStyle: {
        height: 1,
        width: "97%",
        backgroundColor: "#CED0CE",
        marginLeft: "1%"
    },
    progressBarStyle: {
        marginLeft: 10,
        width: Dimensions.get("window").width * 0.49,
    },
    textStyle: {
        borderRightWidth: 1,
        borderRightColor: "#CED0CE",
        fontSize: 14,
        fontWeight: "bold",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        width: Dimensions.get("window").width * 0.27,
    },
    textPercentStyle: {
        width: Dimensions.get("window").width * 0.20,
        paddingLeft: 10,
    }
  });

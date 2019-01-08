import React from "react"
import { View, Image, Dimensions } from "react-native"
import ResultList from "./ResultListComponent"
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

    render() {
      return (
        <View>
          <Image 
                style={{width: this.width, height: this.imageHeight}} 
                source={{uri: this.props.photoURI}} 
                resizeMode="cover"
                resizeMethod="scale"
            />
            <ResultList resultData={this.state.resultData} />
        </View>
      );
    }
}

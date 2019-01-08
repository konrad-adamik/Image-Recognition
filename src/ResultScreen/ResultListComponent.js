import React from "react"
import { View, Text, StyleSheet, Dimensions, FlatList, ProgressBarAndroid } from "react-native"
import EmptyListComponent from "./EmptyListComponent"

truncateProbability = probability => {
    const splitProb = probability.split(".")
    return splitProb[0] + "." + splitProb[1].substring(0,2)
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

const ResultList = props => {
    return (
        <FlatList
            style={styles.listStyle}
            ListEmptyComponent={EmptyListComponent}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            data={props.resultData}
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
    )
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
  
export default ResultList
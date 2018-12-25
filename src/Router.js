import React from "react"
import { Router, Scene } from "react-native-router-flux"
import Header from "./Header/Header"
import HomeScreen from "./HomeScreen/HomeScreen"
import ResultScreen from "./ResultScreen/ResultScreen"

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" >
                <Scene key="homeScreen" component={HomeScreen} navBar={Header}  initial />
                <Scene key="resultScreen" component={ResultScreen} title="Results" />
            </Scene>
        </Router>
    )
}

export default RouterComponent
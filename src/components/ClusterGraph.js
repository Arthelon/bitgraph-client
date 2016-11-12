import React, {Component} from 'react'
import "../tsne"
import {loadPixi, removePixi} from "../tsne-pixi"

const styles = {
    width: "100%",
    position: "absolute",
    height: "100%"
}

class ClusterGraph extends Component {

    componentDidMount() {
        loadPixi();
    }

    componentWillUnmount() {
        removePixi();
    }

    render () {
        return (
            <div id="chart" style={styles}></div>
        )
    }
}

export default ClusterGraph
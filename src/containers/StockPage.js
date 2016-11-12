import React, {Component} from 'react'
import ClusterStocksGraph from '../components/ClusterStocksGraph'
import { CLUSTER_ID } from '../constants'
import db from '../db'

class StockPage extends Component {
    
    state = {
        stocks: []
    }

    componentDidMount() {
        db.get(CLUSTER_ID).then(data => {
            this.setState({
                stocks: data.stocks
            })
        }, err => {
            console.log(err)
        })
    }

    render () {
        return (
            <div>
                <ClusterStocksGraph stocks={this.state.stocks}/>
            </div>
        )
    }
}

export default StockPage
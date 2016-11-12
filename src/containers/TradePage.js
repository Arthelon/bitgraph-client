import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import StockForm from '../components/StockForm'
import StockPreview from '../components/StockPreview'

class TradePage extends Component {

    state = {
        stockSymbol: "",
        quantity: -1
    }

    constructor(props) {
        super(props)
        this.setStockSymbol = this.setStockSymbol.bind(this)
        this.setQuantity = this.setQuantity.bind(this)
    }

    setStockSymbol(symbol) {
        this.setState({
            stockSymbol: symbol
        })
    }

    setQuantity(quantity) {
        this.setState({
            quantity
        })
    }

    render () {
        return (
            <Grid divided={false} celled>
                <Grid.Column width={6}>
                    <StockForm setStockSymbol={this.setStockSymbol} setQuantity={this.setQuantity}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <StockPreview {...this.state} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default TradePage
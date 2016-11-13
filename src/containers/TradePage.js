import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import StockForm from '../components/StockForm'
import StockPreview from '../components/StockPreview'
import UserClusterGains from '../components/UserClusterGains'

class TradePage extends Component {

    state = {
        stockSymbol: "",
        quantity: -1,
        transaction: false,
        toggleUserGains: false
    }

    constructor(props) {
        super(props)
        this.setStockSymbol = this.setStockSymbol.bind(this)
        this.setQuantity = this.setQuantity.bind(this)
        this.setTransaction = this.setTransaction.bind(this)
        this.toggleUserGains = this.toggleUserGains.bind(this)
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

    setTransaction(transaction) {
        this.setState({
            transaction
        })
    }

    toggleUserGains() {
        this.setState({
            toggleUserGains: !this.state.toggleUserGains
        })
    }

    render () {
        console.log(this.state)

        return (
            <Grid divided={false} celled>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <StockForm setStockSymbol={this.setStockSymbol} setQuantity={this.setQuantity} setTransaction={this.setTransaction} toggleUserGains={this.toggleUserGains}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <StockPreview {...this.state} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <UserClusterGains toggle={this.state.toggleUserGains}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default TradePage
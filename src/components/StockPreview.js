import React, {Component} from 'react'
import { Table, Header } from 'semantic-ui-react'
import { getStockData } from '../utils'

class StockPreview extends Component {

    state = {
        stock: {}
    }

    static propTypes = {
        stockSymbol: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        transaction: React.PropTypes.bool.isRequired
    }

    componentWillReceiveProps(props) {
        getStockData(props.stockSymbol).then(res => {
            this.setState({
                stock: res
            })
        }, err => {
            console.log(err)
        })
    }

    render () {
        const {stock} = this.state
        const {transaction, quantity} = this.props

        return (
            <div>
                <h1>Order Preview</h1>
                {Object.keys(stock).length > 0 &&
                    <div>
                        <h2>{stock.name.split("\"").join("")}</h2>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Day High</Table.HeaderCell>
                                    <Table.HeaderCell>Day Low</Table.HeaderCell>
                                    <Table.HeaderCell>Ask</Table.HeaderCell>
                                    <Table.HeaderCell>Bid</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>${stock.dayHigh}</Table.Cell>
                                    <Table.Cell>${stock.dayLow}</Table.Cell>
                                    <Table.Cell>${stock.ask}</Table.Cell>
                                    <Table.Cell>${stock.bid}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        {transaction && quantity > 0 &&
                            <div>
                                <Header as="h3">Sell Price: ${quantity * stock.ask}</Header>
                                <Header as="h3">Buy Price: ${quantity * stock.bid}</Header>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default StockPreview
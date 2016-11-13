import React, {Component} from 'react'
import { Table, Header } from 'semantic-ui-react'
import { getStockData } from '../utils'
import update from 'react-addons-update'

class UserStocks extends Component {

    static propTypes = {
        stocks: React.PropTypes.array.isRequired,
    }

    state = {
        first: true,
        stocks: []
    }

    componentWillReceiveProps(props) {
        if (this.state.first && props.stocks.length > 0) {
            props.stocks.forEach(stock => {
                getStockData(stock.stock_symbol).then(data => {
                    stock.name = data.name,
                    stock.bid = data.bid
                    this.setState({
                        stocks: update(this.state.stocks, {
                            $push: [stock]
                        })
                    })
                }, err => {
                    console.log(err)
                })
            })
            this.setState({
                first: false
            })
        }
    }

    render () {
        const { stocks } = this.state

        return (
            <div>
                <Header as="h3">My Stocks</Header>
                {stocks &&
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Symbol</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Total Value</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {stocks.map(stock => {
                                return (<Table.Row key={stock.stock_symbol}>
                                    <Table.Cell>{stock.stock_symbol}</Table.Cell>
                                    <Table.Cell>{stock.name}</Table.Cell>
                                    <Table.Cell>{JSON.stringify(Math.round(stock.quantity * 100) / 100)}</Table.Cell>
                                    <Table.Cell>${JSON.stringify(Math.round(stock.quantity * stock.bid * 100) / 100)}</Table.Cell>
                                </Table.Row>)
                            })}
                        </Table.Body>
                    </Table>
                }
            </div>
        )
    }
}

export default UserStocks
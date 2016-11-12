import React, {Component} from 'react'
import { Table } from 'semantic-ui-react'
import { getStockData } from '../utils' 
import update from 'react-addons-update'

const { Header, Row, HeaderCell, Cell, Body } = Table


class ClusterStocks extends Component {

    static propTypes = {
        symbols: React.PropTypes.array.isRequired
    }

    state = {
        stocks: []
    }

    componentWillReceiveProps(props) {
        clearInterval(this.interval)
        this.setState({
            symbols: []
        })
        this.interval = setInterval(() => {
            props.symbols.forEach(symbol => {
                getStockData(symbol).then(res => {
                    this.setState({
                        symbols: update(this.state.symbols, {
                            $push: [Object.ares]
                        })
                    })
                }, err => {
                    console.log(err)
                })
            })
        }, 2000)
    }

    render () {

        return (
            <div>
                <h3>Cluster Stocks</h3>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>Symbol</HeaderCell>
                            <HeaderCell>High</HeaderCell>
                            <HeaderCell>Low</HeaderCell>
                            <HeaderCell>Ask</HeaderCell>
                            <HeaderCell>Bid</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.state.stocks.map(stock => {
                            return (<Row>
                                <Cell>{stock.symbol}</Cell>
                                <Cell>{stock.dayHigh}</Cell>
                                <Cell>{stock.dayLow}</Cell>
                                <Cell>{stock.ask}</Cell>
                                <Cell>{stock.bid}</Cell>
                            </Row>)
                        })}
                    </Body>
                </Table>
            </div>
        )
    }
}

export default ClusterStocks
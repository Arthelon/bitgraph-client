import React, {Component} from 'react'
import { Table } from 'semantic-ui-react'
import { getStockData } from '../utils' 
import update from 'react-addons-update'

const { Header, Row, HeaderCell, Cell, Body } = Table

const styles = {
    height: "300px",
    overflow: "scroll"
}

class ClusterStocks extends Component {

    static propTypes = {
        stocks: React.PropTypes.array.isRequired
    }

    state = {
        stocks: []
    }

    constructor(props) {
        super(props)
        this.pollStocks = this.pollStocks.bind(this)
    }

    pollStocks(p) {
        const props = p || this.props
        clearInterval(this.interval)
        this.setState({
            stocks: []
        })
        this.interval = setInterval(() => {
            props.stocks.forEach(symbol => {
                getStockData(symbol).then(res => {
                    this.setState({
                        stocks: update(this.state.stocks, {
                            $push: [Object.assign(res, {symbol})]
                        })
                    })
                }, err => {
                    console.log(err)
                })
            })
        }, 2000)
    }

    componentDidMount() {
        this.pollStocks()
    }

    componentWillReceiveProps(props) {
        this.pollStocks(props)
    }

    render () {

        return (
            <div style={styles}>
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
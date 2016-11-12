import React, {Component} from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'

const csvJSON = csv => {

  const data = csv.split(",")
  const result = {
      dayLow: data[0],
      dayHigh: data[1],
      ask: data[2],
      bid: data[3],
      name: data[4]
  }
  return result; //JSON
}


const getStockData = symbol => {
    return new Promise((resolve, reject) => {
        axios.get(`http://finance.yahoo.com/d/quotes.csv`, {
            params: {
                s: symbol.toUpperCase(),
                f: "ghabn"
            }
        }).then(res => {
            resolve(csvJSON(res.data))
        }, err => {
            reject(err)
        })
    })
}

class StockPreview extends Component {

    state = {
        stock: {}
    }

    static propTypes = {
        stockSymbol: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired
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

        return (
            <div>
                <h1>Order Preview</h1>
                {Object.keys(stock).length > 0 &&
                    <div>
                        <h2>{stock.name}</h2>
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
                    </div>
                }
            </div>
        )
    }
}

export default StockPreview
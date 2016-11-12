import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { API_URL } from '../constants'

const { Group, Input, Select, Checkbox } = Form

const transactions = [
  { text: 'Buy', value: 'buy' },
  { text: 'Sell', value: 'sell' },
]
 
class StockForm extends Component {

    state = {form: {}}

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleSymbolChange = this.handleSymbolChange.bind(this)
    }

    handleSubmit(e, form) {
        e.preventDefault()
        form.quantity = parseInt(form.quantity, 10)
        form.type = form.type[0]
        // axios.post(API_URL)
    }

    handleQuantityChange(e) {
        this.props.setQuantity(parseInt(e.target.value, 10))
    }

    handleSymbolChange(e) {
        this.props.setStockSymbol(e.target.value)
    }

    render () {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Group>
                    <Input label='Stock Symbol' name='stock_symbol' placeholder='Example: AAPL' onChange={this.handleSymbolChange}/>
                </Group>
                <Group>
                    <Select label='Transaction Type' placeholder="Buy / Sell" options={transactions} name="transaction"/>
                </Group>
                <Group>
                    <Input label='Quantity' name='quantity' placeholder='Quantity' type="number" onChange={this.handleQuantityChange}/>
                </Group>
                <Group>
                    <Checkbox label="Market" value="market" name="type" defaultChecked={true}/>
                </Group>
                <Group>
                    <Checkbox label="Limit" value="limit" name="type"/>
                    <Input placeholder="Limit Value" name="limit_price" type="number"/>
                </Group>
                <Button type="submit" primary>Submit</Button>
            </Form>
        )
    }
}

export default StockForm
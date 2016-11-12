import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'

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
    }

    handleSubmit(e, form) {
        e.preventDefault()
        this.setState({ form })
        console.log(form)
    }

    render () {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Group>
                    <Input label='Stock Symbol' name='stock_symbol' placeholder='Example: AAPL' />
                </Group>
                <Group>
                    <Select label='Transaction Type' placeholder="Buy / Sell" options={transactions} name="transaction"/>
                </Group>
                <Group>
                    <Input label='Quantity' name='quantity' placeholder='Quantity' />
                </Group>
                <Group>
                    <Checkbox label="Market" value="market" name="type" defaultChecked={true}/>
                </Group>
                <Group>
                    <Checkbox label="Limit" value="limit" name="type"/>
                    <Input placeholder="Limit Value" name="limit_price"/>
                </Group>
                <Button type="submit" primary>Submit</Button>
            </Form>
        )
    }
}

export default StockForm
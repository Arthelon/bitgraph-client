import React, {Component} from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import axios from 'axios'
import { API_URL } from '../constants'

const { Group, Input, Select, Checkbox } = Form

const transactions = [
  { text: 'Buy', value: 'buy' },
  { text: 'Sell', value: 'sell' },
]
 
class StockForm extends Component {

    state = {
        form: {},
        message: {}
    }

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleTransactionChange = this.handleTransactionChange.bind(this)
        this.handleSymbolChange = this.handleSymbolChange.bind(this)
        this.createMessage = this.createMessage.bind(this)
    }

    handleSubmit(e, form) {
        e.preventDefault()
        form.quantity = parseInt(form.quantity, 10)
        form.type = form.type[0]
        axios.post(API_URL + "/trade", form, {
            headers: { "Content-Type": "application/json"}
        }).then(res => {
            this.createMessage(true)
            this.props.toggleUserGains()
            console.log(res.data)
        }, err => {
            this.createMessage(false)
            console.log(err)
        })
    }

    handleTransactionChange(e) {
        this.props.setTransaction(true)
    }

    handleQuantityChange(e) {
        this.props.setQuantity(parseInt(e.target.value, 10))
    }

    handleSymbolChange(e) {
        this.props.setStockSymbol(e.target.value)
    }

    createMessage(success) {
        this.form._form.reset()
        if (success) {
            this.setState({
                message: {
                    color: "green",
                    message: "Transaction successful"
                }
            })
        } else {
            this.setState({
                message: {
                    color: "red",
                    message: "Error occured"
                }
            })
        }
    }

    render () {
        const { message } = this.state

        return (
            <Form onSubmit={this.handleSubmit} ref={(form) => {
                this.form = form
            }}>
                <Group>
                    <Input label='Stock Symbol' name='stock_symbol' placeholder='Example: AAPL' onChange={this.handleSymbolChange}/>
                </Group>
                <Group>
                    <Select label='Transaction Type' placeholder="Buy / Sell" options={transactions} name="transaction" onChange={this.handleTransactionChange}/>
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
                {Object.keys(message).length > 0 &&
                    <Message color={message.color}>
                        <Message.Content>
                            <Message.Header>{message.message}</Message.Header>
                        </Message.Content>
                    </Message>
                }
            </Form>
        )
    }
}

export default StockForm
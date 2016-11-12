import React, {Component} from 'react'
import db from '../db'
import { List, Input, Button } from 'semantic-ui-react'
import update from 'react-addons-update'
import { USERNAME } from '../constants'

const listStyle = {
    width: "100%",
    height: "600px"
}
const { Content, Item, Header, Description } = List

class ChatWindow extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static propTypes = {
        user: React.PropTypes.object
    }

    state = {
        messages: []
    }

    handleSubmit() {
        const value = this.input.value
        this.messages.set({
            name: USERNAME,
            content: value
        })
        this.input.value = ""
    }

    componentWillReceiveProps(props) {
        console.log(props.user.id)
        const messages = this.messages = db.path(props.user.id).get("messages")
        // messages.set({
        //     name: "Daniel",
        //     content: "test"
        // })

        this.setState({messages: []})

        messages.map().val((message, id) => {
            console.log(props.user.id)
            const {messages} = this.state
            const found = messages.filter(m => {
                return m.id === id
            }).length > 0
            message = Object.assign(message, {id})
            if (!found)
                this.setState({
                    messages: update(messages, {
                        $push: [message]
                    })
                })
        })
    }

    render () {
        const { messages } = this.state
        const { user } = this.props

        return (
            <div>
                {user ?
                    <div>
                        <h1>{user.name}</h1>
                        <List style={listStyle}>
                            {messages.length > 0 ?
                                messages.map(msg => {
                                    return (
                                        <Item key={msg.id}>
                                            <Content>
                                                <Header>{msg.name}</Header>
                                                <Description>{msg.content}</Description>
                                            </Content>
                                        </Item>
                                    )
                                })
                            :
                                <h2>No messages found!</h2>
                            }
                        </List>
                        <Input className="fluid" action>
                            <input type='text' placeholder='Search...' ref={(input) => {
                                this.input = input
                            }}/>
                            <Button onClick={this.handleSubmit} primary>Submit</Button>
                        </Input>
                    </div>
                :
                <h2>Select a user</h2>
                }
            </div>
        )
    }
}

export default ChatWindow
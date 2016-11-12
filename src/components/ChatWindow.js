import React, {Component} from 'react'
import db from '../db'
import { List, Input, Button } from 'semantic-ui-react'
import update from 'react-addons-update'
import { USERNAME, CLUSTER_DATA } from '../constants'
import uuid from 'uuid'

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
        user: React.PropTypes.object,
        clusterId: React.PropTypes.string.isRequired
    }

    state = {
        messages: [],
        rev: ""
    }

    handleSubmit() {
        const value = this.input.value
        const newMessages = update(this.state.messages, {
                $push: [{
                    id: uuid.v4(),
                    name: USERNAME,
                    content: value
                }]
            })
        this.setState({
            messages: newMessages
        })
        db.put({
            _id: this.props.user.id || this.props.clusterId,
            _rev: this.state.rev,
            messages: newMessages,
            stocks: CLUSTER_DATA[2]
        }).then(res => {
            this.setState({
                rev: res.rev
            })
        }, err => {
            console.log(err)
        })
        this.input.value = ""
    }

    componentDidMount() {
        db.get(this.props.clusterId).then(data => {
            this.setState({
                rev: data._rev,
                messages: data.messages || []
            })
        }, err => {
            console.log(err)
        })
    }

    componentWillReceiveProps(props) {
        db.get(props.user.id).then(data => {
            console.log("data")
            console.log(data)
            this.setState({
                rev: data._rev,
                messages: data.messages
            })
        }, err => {
            console.log(err)
        })
    }

    render () {
        const { messages } = this.state
        const { user } = this.props

        return (
            <div>
                {user ?
                    <div>
                        <h1>{user.name || "Cluster Chat"}</h1>
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
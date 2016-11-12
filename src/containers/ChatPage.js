import React, {Component} from 'react'
import ChatBar from '../components/ChatBar'
import ChatWindow from '../components/ChatWindow'
import { Grid } from 'semantic-ui-react'

class ChatPage extends Component {

    state = {
        currUser: {}
    }

    constructor(props) {
        super(props)
        this.handleUserClick = this.handleUserClick.bind(this)
    }

    handleUserClick(user) {
        this.setState({
            currUser: user
        })
    }

    render () {
        return (
            <Grid celled>
                <Grid.Column width={4}>
                    <ChatBar onUserClick={this.handleUserClick} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <ChatWindow user={this.state.currUser} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default ChatPage
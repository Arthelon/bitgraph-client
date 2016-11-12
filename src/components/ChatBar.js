import React, {Component} from 'react'
import { Item } from 'semantic-ui-react'
import update from 'react-addons-update'
import db from '../db'
import uuid from 'uuid'

const containerStyle = {
    background: "#efefef",
    overflow: "scroll",
    maxHeight: "600px"
}
const { Group, Content } = Item

class ChatBar extends Component {
    
    static propTypes = {
        onUserClick: React.PropTypes.func.isRequired
    }

    state = {
        users: []
    }

    componentDidMount() {
        // db.put({
        //     _id: "users",
        //     users: [
        //         {name: "Daniel", id: uuid.v4()},
        //         {name: "Kenta", id: uuid.v4()}
        //     ]
        // })

        db.get("users").then(res => {
            this.setState({
                users: res.users
            })
        }, err => {
            console.log(err)
        })
    }

    handleClick(user) {
        this.props.onUserClick(user)
    }

    render () {
        const { users } = this.state
        return (
            <div style={containerStyle}>
                <Group> 
                    {users.length > 0 ? 
                        users.map(user => {
                            return (
                            <Item key={user.id} onClick={this.handleClick.bind(this, user)}>
                                <Content
                                    className="chatItem"
                                    content={user.name}
                                    verticalAlign='middle'
                                />
                            </Item>)
                        })
                        :
                        <Item><Content content="No users found!"/></Item>
                    }
                </Group>
            </div>
        )
    }
}

export default ChatBar
import React, {Component} from 'react'
import { Item } from 'semantic-ui-react'
import update from 'react-addons-update'
import db from '../db'

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
        // db.get("users").set({
        //     name: "Daniel"
        // })
        // console.log('test')

        db.get("users").map().val((user, id) => {
            console.log(user)
            const { users } = this.state
            let found = false
            user = Object.assign(user, {id})
            const newUsers = users.map(u => {
                if (u.id === id) {
                    found = true
                    return user
                } else {
                    return u
                }
            })
            if (!found) 
                this.setState({
                    users: update(newUsers, {$push: [user]})
                })
            else 
                this.setState({
                    users: newUsers
                })
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
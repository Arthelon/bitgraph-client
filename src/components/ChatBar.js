import React, {Component} from 'react'
import { Item } from 'semantic-ui-react'
import db from '../db'
import ClusterStocks from './ClusterStocks'

const containerStyle = {
    overflow: "scroll",
    height: "300px"
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
            <div>
                <Group style={containerStyle}> 
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
                <ClusterStocks symbols={[]}/>
            </div>
        )
    }
}

export default ChatBar
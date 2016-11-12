import React, {Component} from 'react'
import { Item, Icon } from 'semantic-ui-react'
import db from '../db'
import ClusterStocks from './ClusterStocks'
import ClusterStocksGraph from './ClusterStocksGraph'
import uuid from 'uuid'

const containerStyle = {
    overflow: "scroll",
    height: "300px"
}
const { Group, Content } = Item

class ChatBar extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    
    static propTypes = {
        onUserClick: React.PropTypes.func.isRequired,
        clusterId: React.PropTypes.string.isRequired
    }

    state = {
        users: [],
        stocks: []
    }

    componentDidMount() {
        db.get("users").then(res => {
            this.setState({
                users: res.users
            })
        }, err => {
            console.log(err)
        })
        db.get(this.props.clusterId).then(res => {
            console.log("res")
            console.log(res)
            this.setState({
                stocks: res.stocks
            })
        }, err => {
            console.log(err)
        })
    }

    handleClick(user) {
        this.props.onUserClick(user)
    }

    render () {
        const { users, stocks } = this.state
        return (
            <div>
                <Icon name="home" onClick={() => {
                    location.reload()
                }}/>
                <Group style={containerStyle}> 
                    {users.length > 0 ? 
                        users.map(user => {
                            return (
                            <Item key={user.id} onClick={this.handleClick.bind(this, user)} style={{cursor: "pointer"}}>
                                <Content
                                    className="chatItem"
                                    content={user.name}
                                    verticalAlign='middle'
                                />
                                {user.online ? 
                                    <Icon name="circle"/>
                                :
                                    <Icon name="circle thin"/>
                                }
                            </Item>)
                        })
                        :
                        <Item><Content content="No users found!"/></Item>
                    }
                </Group>
                
                <ClusterStocks stocks={stocks}/>
            </div>
        )
    }
}

export default ChatBar
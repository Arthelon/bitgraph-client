import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'
import { API_URL } from '../constants'
import axios from 'axios'
import update from 'react-addons-update'
import uuid from 'uuid'

class UserClusterGains extends Component {

    state = {
        users: []
    }

    constructor(props) {
        super(props)
        this.updateUsers = this.updateUsers.bind(this)
    }

    updateUsers() {
        this.setState({
                first: false
            })
            axios.get(API_URL + "/data").then(res => {
                console.log(res.data)
                const traders = res.data.traders
                this.setState({
                    users: []
                })
                traders.forEach(trader => {
                    axios.get(API_URL + "/data/" + trader).then(res => {
                        const user = res.data
                        this.setState({
                            users: update(this.state.users, {
                                $push: [Object.assign(user, {id: uuid.v4()})]
                            })
                        })
                    }, err => {
                        console.log(err)
                    })
                })
            }, err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.updateUsers()
    }

    componentWillReceiveProps(props) {
        if (this.props.toggle !== props.toggle) {
            console.log("toggled")
            setTimeout(this.updateUsers, 1000)
        }
    }

    render () {
        const {users} = this.state
        console.log("User update")
        console.log(users)

        return (
            <Card.Group>
                {users &&
                    users.map(user => {
                        return (
                            <Card key={user.id}>
                                <Card.Content>
                                    <Card.Header>{user.name}</Card.Header>
                                    <Card.Description>Cluster Gain: ${Math.round(user.cur_cluster_gain_money*100)/100}</Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })    
                }
            </Card.Group>
        )
    }
}

export default UserClusterGains
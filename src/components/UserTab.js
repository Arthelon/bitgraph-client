import React, {Component} from 'react'
import { Header } from 'semantic-ui-react'
import { USERNAME } from '../constants'
import { List } from 'semantic-ui-react'

class UserTab extends Component {

    static propTypes = {
        user: React.PropTypes.object.isRequired,
    }

    render () {
        const { total_money, cur_cluster_money, cur_cluster_init_money, cur_cluster_gain_money } = this.props.user

        return (
            <div>
                <Header as="h2">{USERNAME}</Header>
                {this.props.user && 
                    <List divided relaxed>
                        <List.Item>
                            <List.Content>
                                <List.Header>My Funds</List.Header>
                                <List.Description>${Math.round(total_money * 100) / 100}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Cluster Total Funds</List.Header>
                                <List.Description>${Math.round(cur_cluster_money * 100) / 100}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Initial Cluster Deposit</List.Header>
                                <List.Description>${Math.round(cur_cluster_init_money * 100) / 100}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Current Cluster Return</List.Header>
                                <List.Description>${Math.round(cur_cluster_gain_money * 100) / 100}</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                }
            </div>
        )
    }
}

export default UserTab
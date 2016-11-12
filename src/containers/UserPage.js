import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import UserTab from '../components/UserTab'
import UserStocks from '../components/UserStocks'
import axios from 'axios'
import { API_URL, USER_ID } from '../constants'

class UserPage extends Component {

    state = {
        user: {
            total_money: -1,
            cur_cluster_money: -1,
            cur_cluster_init_money: -1,
            cur_cluster_stocks: [],
        }
    }

    componentDidMount() {
        axios.get(API_URL + "/data/" + USER_ID).then(res => {
            this.setState({
                user: res.data
            })
        }, err => {
            console.log(err)
        })
    }

    render () {
        const { user } = this.state

        return (
            <Grid celled style={{marginTop: 0}}>
                <Grid.Column width={5}>
                    <UserTab 
                        user={user}
                    />
                </Grid.Column>
                <Grid.Column width={11}>
                    <UserStocks
                        stocks={user.cur_cluster_stocks}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPage
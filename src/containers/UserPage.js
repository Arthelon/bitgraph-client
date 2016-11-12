import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import UserTab from '../components/UserTab'

class UserPage extends Component {
    render () {
        return (
            <Grid celled style={{marginTop: 0}}>
                <Grid.Column width={5}>
                    <UserTab />
                </Grid.Column>
                <Grid.Column width={11}>

                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPage
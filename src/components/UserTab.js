import React, {Component} from 'react'
import { Header } from 'semantic-ui-react'
import { USERNAME } from '../constants'

class UserTab extends Component {
    render () {
        return (
            <div>
                <Header as="h2">{USERNAME}</Header>
            </div>
        )
    }
}

export default UserTab
import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import StockForm from '../components/StockForm'

class TradePage extends Component {
    render () {
        return (
            <Grid divided={false} celled>
                <Grid.Column width={8}>
                    <StockForm/>
                </Grid.Column>
                <Grid.Column width={8}></Grid.Column>
            </Grid>
        )
    }
}

export default TradePage
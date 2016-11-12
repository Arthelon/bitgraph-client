import React from 'react'
import { Route, IndexRoute } from 'react-router'
import IndexPage from './containers/IndexPage'
import App from './App'

const getRoutes = () => {
    return (
        <Route path="/" component={App} >
            <IndexRoute component={IndexPage} />
        </Route>
    )
}
export default getRoutes
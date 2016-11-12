import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import IndexPage from './containers/IndexPage'
import ChatPage from './containers/ChatPage'
import TradePage from './containers/TradePage'
import UserPage from './containers/UserPage'
import ClusterPage from './containers/ClusterPage'
import StockPage from './containers/StockPage'

const getRoutes = () => {
    return (
        <Route path="/" component={App} >
            <IndexRoute component={IndexPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/trade" component={TradePage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/cluster" component={ClusterPage} />
            <Route path="/stock" component={StockPage} />
        </Route>
    )
}
export default getRoutes
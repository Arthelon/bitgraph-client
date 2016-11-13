import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        this.setState({
            currPage: this.context.router.location.pathname.slice(1)
        })
    }

    state = {
        currPage: ""
    }

    handleClick(name) {
        this.setState({
            currPage: name
        })
        this.context.router.push("/"+name)
    }

    render () {
        const { currPage } = this.state

        return (
            <Menu style={{marginBottom: 0, zIndex: 1000}} fluid>
                <Menu.Item
                    name="Clusters"
                    active={currPage === ""}
                    onClick={this.handleClick.bind(this, "")}
                />
                <Menu.Item
                    name="Chat"
                    active={currPage === "chat"}
                    onClick={this.handleClick.bind(this, "chat")}
                />
                <Menu.Item
                    name="Trade"
                    active={currPage === "trade"}
                    onClick={this.handleClick.bind(this, "trade")}
                />
                <Menu.Item
                    name="Home"
                    active={currPage === "cluster"}
                    onClick={this.handleClick.bind(this, "cluster")}
                />
                <Menu.Item
                    name="Stocks"
                    active={currPage === "stock"}
                    onClick={this.handleClick.bind(this, "stock")}
                />
                <Menu.Item
                    position="right"
                    icon="user"
                    onClick={this.handleClick.bind(this, "user")}
                    active={currPage === "user"}
                />
            </Menu>
        )
    }
}

export default NavBar
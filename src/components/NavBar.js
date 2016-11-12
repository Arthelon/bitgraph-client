import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
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
            <Menu>
                <Menu.Item
                    name="Home"
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
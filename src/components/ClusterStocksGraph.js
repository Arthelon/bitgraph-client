import React, {Component} from 'react'
import axios from 'axios'
import { API_KEY } from '../constants'
import update from 'react-addons-update'
import cubism from 'Cubism'
import d3 from 'd3'

const containerStyles = {
    width: "100%",
    height: "100%",
    display: "block",
    position: "absolute"
}

class ClusterStocksGraph extends Component {

    static propTypes = {
        stocks: React.PropTypes.array.isRequired
    }

    state = {
        first: true,
        stocks: []
    }

    constructor(props) {
        super(props)
        this.loadTimeseries = this.loadTimeseries.bind(this)
    }

    loadTimeseries(p) {
        const props = p || this.props
        props.stocks.forEach(stock => {
            axios.get(`https://www.quandl.com/api/v3/datasets/YAHOO/${stock.toUpperCase()}.json`, {
                params: {api_key: API_KEY}
            }).then(res => {
                this.setState({
                    stocks: update(this.state.stocks, {
                        $push: [res.data.dataset]
                    })
                })
            }, err => {
                console.log(err)
            })
        })
    }

    componentWillReceiveProps(props) {
        if (this.state.first && props.stocks.length > 0) {
            this.loadTimeseries(props)
        }
    }

    render () {
        const context = cubism.context().step(864e5).size(1500).stop()
        const stockNames = this.state.stocks.map(stock => {
            return stock.dataset_code
        })
        const getStockData = name => {
            const format = d3.time.format("%Y-%m-%d")
            let index = 0
            let data = this.state.stocks.filter(stock => {
                return name === stock.dataset_code
            })[0]
            return context.metric(function(start, stop, step, callback) {
                // let values = []
                // start = +start;
                // stop = +stop;
                // while (start < stop) {
                //     start += step
                //     const item = data.data[index]
                //     values.push(
                //         [format.parse(item[0]), item[1]]
                //     )
                // }
                // callback(null, values = values.slice((start - stop) / step));
                // }
                console.log(data.data)
                data = data.data.map(function(d) { return [format.parse(d[0]), +d[1]]; }).filter(function(d) { return d[1]; }).reverse();
                var date = data[0][0], compare = data[1000][1], value = data[0][1], values = [value];
                data.forEach(function(d) {
                    while ((date = d3.time.day.offset(date, 1)) < d[0]) values.push(value);
                    values.push(value = (d[1] - compare) / compare);
                });
                callback(null, values.slice(-context.size()));
            }, name)
        }

        d3.select(".stockGraph").selectAll(".axis")
            .data(["bottom"])
        .enter().append("div")
            .attr("class", function(d) { return d + " axis"; })
            .each(function(d) { d3.select(this).call(context.axis().ticks(12).orient(d)); });

        d3.select(".stockGraph").append("div")
            .attr("class", "rule")
            .call(context.rule());
            console.log(stockNames)
        d3.select(".stockGraph").selectAll(".horizon")
            .data(stockNames.map(getStockData))
        .enter().insert("div", ".bottom")
            .attr("class", "horizon")
        .call(context.horizon()
            .format(d3.format("+,.2p")));


        return (
            <div className="stockGraph" style={containerStyles}>
            </div>
        )
    }
}

export default ClusterStocksGraph
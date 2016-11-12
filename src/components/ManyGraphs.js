import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import { ManyGraphsSetup } from '../utils'

class ManyGraphs extends Component {

    componentDidMount() {
        ManyGraphsSetup()
    }

    render () {
        return (
            <Grid divided="vertically" centered>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div id="yearly-bubble-chart" className="dc-chart">
                            <strong>Yearly Performance</strong> (radius: fluctuation/index ratio, color: gain/loss)
                            <a className="reset" href="javascript:yearlyBubbleChart.filterAll();dc.redrawAll();"
                            style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={4}>
                    <Grid.Column>
                        <div id="gain-loss-chart">
                            <strong>Days by Gain/Loss</strong>
                            <a className="reset" href="javascript:gainOrLossChart.filterAll();dc.redrawAll();" style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div id="quarter-chart">
                            <strong>Quarters</strong>
                            <a className="reset" href="javascript:quarterChart.filterAll();dc.redrawAll();" style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div id="day-of-week-chart">
                            <strong>Day of Week</strong>
                            <a className="reset" href="javascript:dayOfWeekChart.filterAll();dc.redrawAll();" style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div id="fluctuation-chart">
                            <strong>Days by Fluctuation(%)</strong>
                            <span className="reset" style={{display: "none"}}>range: <span className="filter"></span></span>
                            <a className="reset" href="javascript:fluctuationChart.filterAll();dc.redrawAll();" style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div id="monthly-move-chart">
                            <strong>Monthly Index Abs Move & Volume/500,000 Chart</strong>
                            <span className="reset" style={{display: "none"}}>range: <span className="filter"></span></span>
                            <a className="reset" href="javascript:moveChart.filterAll();volumeChart.filterAll();dc.redrawAll();"
                            style={{display: "none"}}>reset</a>
                            <div className="clearfix"></div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div id="monthly-volume-chart"></div>
                        <p className="muted pull-right" style={{marginRight: "15px"}}>select a time range to zoom in</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div>
                            <div className="dc-data-count">
                                <span className="filter-count"></span> selected out of <span className="total-count"></span> records | <a
                                    href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
                            </div>
                        </div>
                        <table className="ui table dc-data-table">
                        </table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ManyGraphs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuilds } from '../actions/index';
import { fetchServerCompare } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import "react-table/react-table.css";
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


class BuildDisplay extends Component {
    constructor(props) {
        super(props);
        this.handleServer1Select = this.handleServer1Select.bind(this);
        this.handleServer2Select = this.handleServer2Select.bind(this);
        this.onCompareClick = this.onCompareClick.bind(this);
        this.state = {
            server1: 'Delhi',
            server2: 'Chicago',
            showCompare: false,
            builds: []
        }
    }

    componentDidMount() {
        this.props.fetchBuilds();
    }

    handleServer1Select(e) {
        console.log("event:", e)
        this.setState({ server1: e });
    }
    handleServer2Select(e) {
        console.log("event:", e)
        this.setState({ server2: e });
    }
    onCompareClick() {
        this.setState({ showCompare: !this.state.showCompare });
        this.props.fetchServerCompare(this.state.server1, this.state.server2);
        console.log("Compare Data",this.props.serverCompare);
    }


    render() {
        const builddata = this.props.builds;
        const comparedata = this.props.serverCompare;
        const compareColumns = [{
            Header: 'AppName',
            accessor: 'AppName'
        },
        {
            Header: 'Server1Name',
            accessor: 'Server1Name'
        },
        {
            Header: 'Server1Commit',
            accessor: 'Server1Commit'
        },
        {
            Header: 'Server1DeployDate',
            accessor: 'Server1DeployDate'
        },
        {
            Header: 'Server2Name',
            accessor: 'Server2Name'
        },
        {
            Header: 'Server2Commit',
            accessor: 'Server2Commit'
        },
        {
            Header: 'Server2DeployDate',
            accessor: 'Server2DeployDate'
        }]
        const buildColumns = [{
            Header: 'AppName',
            accessor: 'AppName'
        },
        {
            Header: 'CommitVersion',
            accessor: 'CommitVersion',
            width: 350
        },
        {
            Header: 'Comments',
            accessor: 'Comments',
            style: { 'whiteSpace': 'unset' },
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["Comments"] }),
            filterAll: true

        },
        {
            Header: 'DeployedOn',
            accessor: 'DeployedOn',
            Cell: row => <span>
                {
                    moment(row.value).format('MM/DD/YYYY HH:mm:ss')
                }
            </span>
        },
        {
            Header: 'PriorCommitVersion',
            accessor: 'PriorCommitVersion',
            width: 350
        },
        {
            Header: 'PriorDeployDate',
            accessor: 'PriorDeployDate',
            Cell: row => <span>
                {
                    moment(row.value).format('MM/DD/YYYY HH:mm:ss')
                }
            </span>
        },
        {
            Header: 'Server',
            accessor: 'Server',
            width: 150
        },
        {
            Header: 'StoriesIncluded',
            accessor: 'StoriesIncluded',
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["StoriesIncluded"] }),
            filterAll: true
        }]
        console.log("builds", this.props.builds);
        console.log("buildcompare", this.props.serverCompare);
        return (
            <div>
                <div className="row">
                    <div className="col-1">
                        <Dropdown onSelect={this.handleServer1Select}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                                {this.state.server1}
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="Something else">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-1">
                        <Dropdown onSelect={this.handleServer2Select}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                                {this.state.server2}
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="Something else">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-1">
                        <Button variant="secondary" onClick={this.onCompareClick}>Compare</Button>
                    </div>
                </div>
                <div>
                    {this.state.showCompare &&
                        <ReactTable
                            filterable={true}
                            data={comparedata}
                            columns={compareColumns}
                            className="-striped -highlight"
                            defaultPageSize={100}
                        />
                    }
                </div>
                <div >
                    {!this.state.showCompare &&
                        <ReactTable
                            filterable={true}
                            data={builddata}
                            columns={buildColumns}
                            className="-striped -highlight"
                            defaultPageSize={100}
                        />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ builds, serverCompare }) {
    return { builds, serverCompare };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBuilds, fetchServerCompare }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildDisplay);
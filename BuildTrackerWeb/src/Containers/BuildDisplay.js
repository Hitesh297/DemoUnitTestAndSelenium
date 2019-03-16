import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuilds } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import "react-table/react-table.css";
import moment from 'moment';


class BuildDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBuilds();
    }

    render() {
        const data = this.props.builds;
        const columns = [{
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
        console.log("test", this.props.builds);
        return (
            <ReactTable
                filterable={true}
                data={data}
                columns={columns}
                className="-striped -highlight"
                defaultPageSize={100}
            />
        );
    }
}

function mapStateToProps({ builds }) {
    return { builds };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBuilds }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildDisplay);
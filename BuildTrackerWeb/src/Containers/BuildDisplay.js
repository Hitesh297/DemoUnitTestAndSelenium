import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuilds } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import "react-table/react-table.css";


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
            Header: 'CommitVersion',
            accessor: 'CommitVersion',
            width:350
        },
            {
                Header: 'Comments',
                accessor: 'Comments',
                style: { 'whiteSpace': 'unset' },
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Comments"] }),
                filterAll: true,
                width:450
                
            },
            {
                Header: 'DeployedOn',
                accessor: 'DeployedOn' // String-based value accessors!
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
        console.log("test",this.props.builds);
        return (
            <ReactTable
                filterable={true}
            data={data}
            columns={columns}
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
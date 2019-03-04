import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuilds } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
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
            accessor: 'CommitVersion'
        },
            {
                Header: 'Comments',
                accessor: 'Comments' // String-based value accessors!
            },
            {
                Header: 'DeployedOn',
                accessor: 'DeployedOn' // String-based value accessors!
            },
            {
                Header: 'Server',
                accessor: 'Server' // String-based value accessors!
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
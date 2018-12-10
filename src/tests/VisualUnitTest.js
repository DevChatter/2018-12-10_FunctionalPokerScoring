import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import { Grid, GridColumn, GridCell } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

export default class VisualUnitTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: deepEqual(this.props.expected, this.props.actual),
      dataDisplay: this.props.data,
      sort: []
    };
    this.sortChange = this.sortChange.bind(this);
  }
  sortChange(event) {
    this.setState({
      dataDisplay: this.doSort(event.sort),
      sort: event.sort
    });
  }

  doSort(sort) {
    return orderBy(this.props.data, sort);
  }
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        { !this.state.pass &&  
        <Grid data={this.state.dataDisplay}
          sortable={{
            allowUnsort: true,
            mode: 'multiple'
          }}
          sort={this.state.sort}
          sortChange={this.sortChange}>
          <GridColumn field="image" title="Card" width="90" cell={ImageCell} sortable={false} />
          <GridColumn field="suit" title="Suit" />
          <GridColumn field="numValue" title="# Value" />
          <GridColumn field="code" title="Code" />
        </Grid>}
        <PassFail description={this.props.description} value={this.state.pass} />
        <small>Output was: {JSON.stringify(this.props.actual)}</small>
      </div>
    );
  }
}

class ImageCell extends GridCell {
  render() {
    return (
      <td>
        <img src={this.props.dataItem[this.props.field]} width="60px" />
      </td>
    );
  }
}

class PassFail extends Component {
  constructor(props) {
    super(props);
    this.state = {passFailText: this.props.value  ? "pass" : "fail"}
  }
  render() {
    return (
      <div className={this.state.passFailText  + " output"}>
        <p>{this.props.description}
          <span>{this.state.passFailText}</span>
        </p>
      </div>
    );
  }
}
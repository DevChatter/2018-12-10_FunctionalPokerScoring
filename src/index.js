/*

This project is a poker scoring challenge. 
To begin, open /components/Scoring.js, your progress will be shown in the output window automaticaly.

*/
import '@progress/kendo-theme-default/dist/all.css';
import './style.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

// Unit test visualizer built with Kendo UI
// https://www.telerik.com/kendo-angular-ui/
import VisualUnitTest from './tests/VisualUnitTest';
// Unit test definitions.
import { tests } from './tests/tests.js';

class App extends Component {
  constructor() {
    super();
    this.state = { tests: tests };
  }

  render() {
    return (
      <div>
          {this.state.tests.map(test => (
              <VisualUnitTest key={test.id}
                id={test.id}
                name={test.name}
                data={test.data}
                actual={test.actual}
                expected={test.expected}
                description={test.description}
              />
          ))}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import Async from '../dist/react-async.component.min';

const AsyncHome = () => (<Async load={import(/* webpackChunkName: "homefatchunk" */ './home')} loader="please wait ...." />);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClick = () => {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <h1>Welcome React Async Component</h1>
        <button type="button" onClick={this.handleClick}>Load async home</button>
        <div>
          {
          show
          && (
          <div>
            <br />
            <AsyncHome />
          </div>
          )
        }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

# react-asynchronous-component 

react-asynchronous-component resolves component asynchronously  with support for code-spliting.

react-asynchronous-component gives you power to split your bundles into small chunks with webpack and lazy load them, 
this reduces the cost of initial JS to be downloaded. for big projects its ideal to use code-spliting because the
bundle size increases and a lot of useless javascript is download which really is not required for the first render.


## Prerequisite
- You are using [React 15+](https://reactjs.org/)
- You are using [Webpack 2+](https://webpack.js.org/)

## INSTALL 
`npm install react-asynchronous-component`

## Features
- code spliting
- asynchronously resolves component
- Show a `LoadingComponent` until your component is resolved.
- Show an `ErrorComponent` if your component resolution fails.

## Usage

lets say you have a `Home` component which has a lot of content and assets in it.

```
export default function Home() {
  return <div>hell home</div>
}

```
or 
```
const Home = () =>  <div>hello home</div>

```

to implement async rendering and code spliting for home component 

```
import React from 'react';
import Async from 'react-asynchronous-component';

const AsyncHome = (props) => (
    <Async 
        load={import(/* webpackChunkName: "home" */ './home')} 
        loader={<p>loading</p>}
        error={<p>sime error occured</p>} 
        componentProps={props}
    />
);

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome React Async Component</h1>
            <AsyncHome someProps="somevalue" />
        </div>
      </div>
    );
  }
}
export default App
```

**best usecase**
in your react router you can convert all routing components to async components
which makes each route a chunk. saves a lot of initial load time.


```
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter, Redirect, Route } from 'react-router-dom';
import Async from 'react-asynchronous-component';

const AsyncHome = props => (
    <Async 
        componentProps={props} 
        load={import('./Home.component' /* webpackChunkName: "home" */)} 
        loading="loading...."
        error="error...."
    />
);

const AsyncProfile = props => (
    <Async 
        componentProps={props} 
        load={import('./Profile.component' /* webpackChunkName: "profile" */)} 
        loading={<p>loading....</p>}"
        error={<p>Error....</p>}
    />
);
const AsyncErrorPage = props => (
    <Async 
        componentProps={props} 
        load={import('./ErrorPage.component' /* webpackChunkName: "errorpage" */)} 
        loading="loading...."
        error="error...."
        />
    );

const Routes = () => (
  <div className="routes-wrapper">
      <Switch>
        <Route exact path="/"  component={AsyncHome}  />
        <Route exact path="/profile" component={AsyncProfile}  />
        <Route exact path="/error/:type"  component={AsyncErrorPage}  />
        <Redirect to={`/error/not-found`} />
      </Switch>
  </div>
);
export default withRouter(Routes);

```
You can view this snippets in context [here](https://github.com/hannadrehman/react-production) !
#### Install

```sh
$ npm install react-miniflow
```

#### Usage

```javascript

var React = require('react');
import { State, Enhance } from 'react-miniflow';

State.init({count: 0});

// Enhance component and listen for count updates
var Component = Enhance(
  class extends React.Component {
    render() {
      return <h2>{ this.props.count }</h2>
    }
},['count']);

// Update state
setInterval(() => {
  State.set('count', (State.get('count')+1);
},1000)

```


Example with multiple listeners and custom setState() handler

```javascript
State.init({count: 0, name: 'Odjob'});

// Enhance component and listen for count updates
var Component = Enhance(
  class extends React.Component {
    render() {
      return <div>
        <h2>{ this.props.count }</h2>
        <h2>{ this.props.name }</h2>
      </div>
    }
},['count',{event: 'name', handler: (name) => {
  return `Hello Mr.${name}`
}}]);

setInterval(() => {
  State.set('count', (State.get('count')+1);
},1000)

// Update state
setTimeout(() => {
  State.set('name', 'Bond');
},1000);
```

### State Methods

* ### State.set(type, data) > this.props.[type] -> {id: type, value: data}

* ### State.get(type) -> {id: type, value: data}

* ### State.init(structure) -> Set initial structure

* ### State.fire(event, data) -> emit event
---
#### Changelog:
##### 1.0.0 - Api changes - Change datastructure to return only data not id and value










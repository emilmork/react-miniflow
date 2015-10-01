Simple Action-Store structure by using a higher-order function.

### Work in progress 

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
      if(this.props.count == null) return null;

      return <h2>{ this.props.count.value }</h2>
    }
},['count']);

// Update state
setInterval(() => {
  State.set('count', (State.get('count').value)+1);
},1000)

```


Example with multiple listeners and custom setState() handler

```javascript
State.init({count: 0, name: 'Odjob'});

// Enhance component and listen for count updates
var Component = Enhance(
  class extends React.Component {
    render() {
      if(this.props.count == null) return null;

      return <div>
        <h2>{ this.props.count.value }</h2>
        <h2>{ this.props.name }</h2>
      </div>
    }
},['count',{event: 'name', handler: (data) => {
  return `Hello Mr.${data.value}`
}}]);

setInterval(() => {
  State.set('count', (State.get('count').value)+1);
},1000)

// Update state
setTimeout(() => {
  State.set('name', 'Bond');
},1000);

```






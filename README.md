Simple Action-Store structure by using a higher-order function.

### Work in progress 

#### Install

```sh
$ npm install react-miniflow
```

#### Instructions




```javascript
import { Store, EnhancedComponent } from 'react-miniflow';

class MyComponent extends React.Component {
  render() {
    if(this.props.data == null) return <h2>Loading..</h2>
    return (
      <div>{this.props.data.message}</div>
    );
  }
}
export default EnhancedComponent(MyComponent,[{event:'message', handler: (message) => {
    return message + " world";
}]);
```
```javascript
React.render(
  <MyComponent />,
  document.getElementById('content')
);
```

```javascript
Store.init({message: ''});

Store.update('message','_id','Hello');
```

Will output 'Hello world'

When the store is updated MyComponent will be updated with the new props.





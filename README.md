# react-permissions

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Permissioned Component rendering in React.

[build-badge]: https://img.shields.io/travis/IkoroVictor/react-permissions/master.png?style=flat-square
[build]: https://travis-ci.org/IkoroVictor/react-permissions

[npm-badge]: https://img.shields.io/npm/v/react-permissions.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-permissions

[coveralls-badge]: https://img.shields.io/coveralls/IkoroVictor/react-permissions/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/IkoroVictor/react-permissions

## Installation

```
npm install --save react-permissions
```

## Basic Usage

### Component Definition

```javascript
import React from 'react';
import {Permissioned} from  'react-permissions';

const requiredPermissions = ["VIEW", "UPDATE"]
class MyComponent extends React.Component
{
   render(){
      return(
        <div>Hey there, i am a component</div>
        );
   }
}

export default Permissioned(MyComponent, requiredPermissions);
```
`requiredPermissions` parameter can be omitted and the required permissions passed as `allowedPermissions` props

```javascript
 import React from 'react';
 import MyComponent from './myComponent.js'
 
 const ViewComponent = (props) => {
  
    return (
      <MyComponent  allowedPermissions={["VIEW", "UPDATE"]}/>);
 
 }
 
 export default ViewComponent;
```


### User Permissions
User's permissions array should be set on the static `Permissioned.allPermissions` field or a mapper set on `Permissioned.mapPermissions` (for store(Redux) connected components)

```javascript
import React from 'react';
import {Permissioned} from  'react-permissions';

Permissioned.allPermissions = ["VIEW", "UPDATE", "DELETE", "EDIT", "SIGN_IN", "CREATE_USER", "UPLOAD"];
```
For store connected components

```javascript
import React from 'react';
import {Permissioned} from  'react-permissions';
import {connect} from 'react-redux';

Permissioned.mapPermissions = (storeConnectedProps) =>{
      //map & return an array of user permissions gotten from props 
}

const mapStateToProps(state, ownProps)
{
      //State to props mapping (redux)
}
class MyComponent extends React.Component
{
   render(){
      return(
        <div>Hey there, i am a component<div/>
        );
   }
}
export connect(mapStateToProps, Permissioned(MyComponent));
```

### hasAll
By default, the permisioned component renders if the user has at least one of the `allowedPermission`.  Set `hasAll` prop to `true` to require all `allowedPermissions`

```javascript
 import React from 'react';
 import MyComponent from './myComponent.js'
 
 const ViewComponent = (props) => {
  
    return (
    <div>
      <MyComponent  hasAll={true} allowedPermissions={["VIEW", "UPDATE"]}/>
     <div/>
     );
 
 }
 
 export default ViewComponent;
 ```
 
 ### Alternate View
 You can set an alternate view component which will be render in place of the permissioned component when restricted. Alternate view should be set as a `alternateView` prop
 
 
```javascript

import React from 'react';
import MyComponent from './myComponent.js'

const MyAlternateView = (props) => {
   return(
      <div>You are not allowed to view this<div/>
   );

}
const ViewComponent = (props) => {
  
    return (
    <div>
      <MyComponent alternateView={MyAlternateView}  hasAll={true} allowedPermissions={["VIEW", "UPDATE"]}/>
     <div/>
     );
 
 }
 
 export default ViewComponent;
 ```
 
 
## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/IkoroVictor/react-permissions. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
 




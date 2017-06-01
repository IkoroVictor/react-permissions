# react-permissions

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Permissioned Component rendering in React

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

##Basic Usage

### Component Definition
```
import React from 'react';
import {Permissioned} from  'react-permissions';

const requiredPermissions = ["VIEW", "UPDATE"]
class MyComponent extends React.Component
{
   render(){
      return(
        <div>Hey there, i'm a component</div>
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

```javascript
import React from 'react';
import {Permissioned} from  'react-permissions';

Permissioned.mapPermissions = (storeConnectedProps) =>{

}
class MyComponent extends React.Component
{
   render(){
      return(
        <div>Hey there, i'm a component</div>
        );
   }
}





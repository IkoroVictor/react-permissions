import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import {Permissioned} from 'src/'


Permissioned.allPermissions = ["VIEW_COMPONENT", "CREATE_COMPONENT", "USE_COMPONENT", "UPDATE_COMPONENT", "DELETE_COMPONENT"];

const elementId = "componentId";
const testMessage =  "Hey i rendered";
const alternateTestMessage =  "Hey, alternate test message";
const MyComponent =  (props) =>
{
  return(<div id={elementId}>{testMessage}</div>);
}

const MyAlternateView = (props) =>
{
  return(<div id={elementId}>{alternateTestMessage}</div>);
};


describe('Component Permission Test (without mapped props|| permission mapping)', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('has permission', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["VIEW_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })

   it('has permission (Allowed permission passed as prop)', () => {
    let PermissionedComponent = Permissioned(MyComponent);
    render(<PermissionedComponent allowedPermissions={["VIEW_COMPONENT", "CREATE_COMPONENT"]}/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })
  
  it('has permission (1 missing, must have at least 1)', () => {
    let PermissionedComponent = Permissioned(MyComponent);
    render(<PermissionedComponent allowedPermissions={["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]}/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })

  it('doesnt have permission (1 missing, must have all ) ', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent hasAll={true}/>, node, () => {
      expect(node.innerHTML).toNotContain(testMessage);
    })
  })

  it('doesnt have permission (has none, must have all ) ', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent hasAll={true}/>, node, () => {
      
      expect(node.innerHTML).toNotContain(testMessage);
    })
  })
})


//PERMISSION MAPPING
Permissioned.allPermissions = null;

const simulatedUserObject = {
  name : "Victor Ikoro",
  userPermissions : ["VIEW_COMPONENT", "CREATE_COMPONENT", "USE_COMPONENT", "UPDATE_COMPONENT", "DELETE_COMPONENT"]
}

//Must return an array of permissions mapped from props(which may be mapped from a redux state using mapStateToProps)
Permissioned.mapPermissions = (props) =>
{
  return props.myUserReducerObject.userPermissions; 
}
describe('Component Permission Test (with downstream state change &&  permission mapping)', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  ///We are going to simulate passing props mapped from global store/state
  it('has permission', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["VIEW_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent myUserReducerObject={simulatedUserObject}/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })

   it('has permission (Allowed permission passed as prop)', () => {
    let PermissionedComponent = Permissioned(MyComponent);
    render(<PermissionedComponent  myUserReducerObject={simulatedUserObject} allowedPermissions={["VIEW_COMPONENT", "CREATE_COMPONENT"]}/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })
  
  it('has permission (1 missing, must have at least 1)', () => {
    let PermissionedComponent = Permissioned(MyComponent);
    render(<PermissionedComponent myUserReducerObject={simulatedUserObject} allowedPermissions={["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]}/>, node, () => {
      expect(node.innerHTML).toContain(testMessage);
    })
  })

  it('doesnt have permission (1 missing, must have all ) ', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent myUserReducerObject={simulatedUserObject} hasAll={true}/>, node, () => {
      expect(node.innerHTML).toNotContain(testMessage);
    })
  })

  it('doesnt have permission (has none, must have all ) ', () => {
    let PermissionedComponent = Permissioned(MyComponent, ["ARBITRATE_COMPONENT", "CREATE_COMPONENT"]);
    render(<PermissionedComponent myUserReducerObject={simulatedUserObject} hasAll={true}/>, node, () => {
      
      expect(node.innerHTML).toNotContain(testMessage);
    })
  })
})

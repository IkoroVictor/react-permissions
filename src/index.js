import React,  {PropTypes} from 'react';


export function Permissioned(WrappedComponent, allowedPermissions) {
    var PermissionedComponent = class extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                allowedPermissions: allowedPermissions || (props.allowedPermissions ||  [])
            };
            this.allPermissions = Permissioned.prototype.allPermissions || [];
            this.alternateView = props.alternateView ||  React.createClass({render(){ return <div/>}});

        }

        componentWillReceiveProps(nextProps) {
            nextProps.allowedPermissions && this.setState({ allowedPermissions: nextProps.allowedPermissions });
            this.allPermissions =  Permissioned.prototype.allPermissions || Permissioned.mapPermissions(nextProps);
        }
        componentWillUpdate(props,state)
        {
            props.allowedPermissions && this.setState({ allowedPermissions: props.allowedPermissions });
            this.allPermissions =  Permissioned.prototype.allPermissions  || Permissioned.mapPermissions(props);
        }
        hasPermission(and)
        {   
            let hasPermissionTo = true;
            let filteredList =  this.allPermissions.filter(permission =>{
                return this.state.allowedPermissions.filter(allowedPermission =>{
                   return allowedPermission == permission;  
                }).length > 0;
               
            });
            hasPermissionTo = and ? (filteredList.length  === this.state.allowedPermissions.length) : (filteredList.length > 0);
            return hasPermissionTo;
        }
        render() {
            const AlternateView = this.alternateView
            if (this.hasPermission(this.props.hasAll))
                return (<WrappedComponent {...this.props} />);
            return <AlternateView/>;
        }
    }
    return PermissionedComponent;
}



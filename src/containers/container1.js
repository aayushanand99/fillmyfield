import react, { component } from 'react';
import { connect } from 'react-redux';
import { actionName } from '../actions/index.js'// the action name to be imported
import { bindActionCreators } from 'redux'// to bind the action to redux
//containers have a direct connection to the application state 
//unlike components which are essentially dumb views
class className extends component{
	render(){
	return()
	}
}

function mapStateToProps(state){
	//whatever is returned wil show up as props 

}

export default connect(mapStateToProps)(className)
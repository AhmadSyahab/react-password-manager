import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPmFromFirebase } from '../actions/pm'
import { add_pm } from '../actions/pm'
import PmList from './PmList'

class Home extends Component {
	constructor() {
		super() 
		this.state = {
			url: '',
			owner: '',
			username: '',
			password: '',
			checkLC: 'alert alert-dismissible alert-danger',
			checkUC: 'alert alert-dismissible alert-danger',
			checkNum: 'alert alert-dismissible alert-danger',
			checkLength: 'alert alert-dismissible alert-danger',
			checkSpecial: 'alert alert-dismissible alert-danger'
		}
	}

	changeHandler(event){
		this.setState({
			[event.target.name] : event.target.value
		})

	}

	passwordHandler(event){
		  // Validate lowercase letters
		  var lowerCaseLetters = /[a-z]/g;
		  if(event.target.value.match(lowerCaseLetters)) {  
		   this.setState({
		   	checkLC: 'alert alert-dismissible alert-success'
		   })
		  } else {
		  	this.setState({
		  	checkLC: 'alert alert-dismissible alert-danger'
		  	})
		  }
		  
		  // Validate capital letters
		  var upperCaseLetters = /[A-Z]/g;
		  if(event.target.value.match(upperCaseLetters)) {  
		   this.setState({
		   	checkUC: 'alert alert-dismissible alert-success'
		   })
		  } else {
		   this.setState({
		   	checkUC: 'alert alert-dismissible alert-danger'
		   })
		  }

		  // Validate numbers
		  var numbers = /[0-9]/g;
		  if(event.target.value.match(numbers)) {  
		   this.setState({
		   	checkNum: 'alert alert-dismissible alert-success'
		   })
		  } else {
		   this.setState({
		   	checkNum: 'alert alert-dismissible alert-danger'
		   })
		  }
		  
		  // Validate length
		  if(event.target.value.length > 5) {
		  	this.setState({
		  		checkLength: 'alert alert-dismissible alert-success'
		  	})
		  } else {
		  	this.setState({
		  		checkLength: 'alert alert-dismissible alert-danger'
		  	})
		  }	

		  // Validate Special Character
		  var special = /[^A-Za-z0-9]/g;
		  if(event.target.value.match(special)) {  
		   this.setState({
		   	checkSpecial: 'alert alert-dismissible alert-success'
		   })
		  } else {
		   this.setState({
		   	checkSpecial: 'alert alert-dismissible alert-danger'
		   })
		  }		  
	}

	savePM() {
    const newPM = {
		url: this.state.url,
		owner: this.state.owner,
		username: this.state.username,
		password: this.state.password
    }			
		add_pm(newPM)	
	}
	render() {
		return (
			<div className="home">
			<button className="btn btn-info btn-md" data-toggle="modal" data-target="#addPassword">Add Password</button>
			  <table className="table table-hover">
			  <thead>
			    <tr>
			      <td className="table-info" >Url</td>
			      <td className="table-info" >owner</td>
			      <td className="table-info" >username</td>
			      <td className="table-info" >password</td>
			    </tr>
			   </thead> 
			    <tbody>
					{this.props.pms.map((pm,i) => {
						return(
							<PmList pmList={pm} key={i} />
						)
					})}
				</tbody>	 	
			  </table>	
				<div className="modal" id="addPassword">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title">Password Management</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				     

					<form>
					  <fieldset>
					    <div className="form-group">
					      <label>Url</label>
					      <input type="text" name="url" onChange={(e) => this.changeHandler(e)} className="form-control" placeholder="Url" />					     
					    </div>
					    <div className="form-group">
					      <label>Owner</label>
					      <input name="owner" onChange={(e) => this.changeHandler(e)} type="text" className="form-control" placeholder="Owner" />					     
					    </div>					    
					    <div className="form-group">
					      <label>Username</label>
					      <input name="username" onChange={(e) => this.changeHandler(e)} type="text" className="form-control" placeholder="Username" />					     
					    </div>					    
					    <div className="form-group">
					      <label>Password</label>
					      <input name="password" onChange={(e) => this.passwordHandler(e)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					    </div>				    
					  </fieldset>
					</form>
					<div id="message">
					  <small>Password must contain the following:</small>					  
						<p className={this.state.checkLC} >A  <b>lowercase</b> letter</p>
						<p className={this.state.checkUC} >A   <b>capital (uppercase)</b> letter</p>
						<p className={this.state.checkNum} >A   <b>number</b></p>
						<p className={this.state.checkLength} > <b>length</b> > 5 </p>
						<p className={this.state.checkSpecial} > Must Have <b>Special Character</b> </p>
					</div>

				      </div>
				      <div className="modal-footer">
				        <button onClick={() => this.savePM()}type="button" data-dismiss="modal" className="btn btn-primary">Submit</button>
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>			
			</div>
		)
	}

	componentDidMount() {
		this.props.getPmFromFirebase()
	}
}

function mapStateToProps(state) {
	return {
		pms: state.pmReducer.pms
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPmFromFirebase: () => dispatch(getPmFromFirebase())
	}
}

export default connect (mapStateToProps,mapDispatchToProps) (Home)
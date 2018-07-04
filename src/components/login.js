import React from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import {Paper , TextField ,RaisedButton} from 'material-ui';

class Login extends React.Component{
    ref = firebase.database().ref();
    constructor(){
        super();
        this.state={
            email : '',
            password : ''
        }
    }
    signmethod=()=>{ 
        const auth = firebase.auth();
            if(this.state.email === ''  || this.state.password === ''){
                alert('Please complete fields')
                this.setState({
                    email : '',
                    password : ''
                })
            }
            else {
            const promise = auth.signInWithEmailAndPassword(this.state.email,this.state.password);
            promise.then(e=>{
                firebase.database().ref(`Users/${e.uid}`).on('value',snap=>{
                    var data = snap.val();
                    if(data === null){
                        alert('Your Account has been deleted by admin!!!!')
                        firebase.auth().currentUser.delete();
                        this.setState({
                            email : '',
                            password : ''
                        })
                    }
                    else{
                        this.props.history.push('/studentlogin')
                    }
                })
            })
            promise.catch(e => {
                alert(e.message)
                this.setState({
                    email : '',
                    password : ''
                })
              });
        }
    
    }
    render(){
        return(
            <section>
        <div>    
            <Paper style={style} zDepth={4} >
                <h1>Login Form</h1>
            <form>
                <div>
                    <TextField value={this.state.email} floatingLabelText="Email Address" onChange={(evt)=>this.setState({email : evt.target.value})}/>
                    <TextField value={this.state.password} floatingLabelText="Password" type="password" onChange={(evt)=>this.setState({password : evt.target.value})}/><br/>
                </div>
                <br/>
                <div className="newaccount">Create a New Account:<Link to='/signup'><span className="newSign"> Signup</span> </Link></div> <br/>
                <RaisedButton backgroundColor = '#003333' labelStyle={{color : 'white'}}  label="Log In"onClick={()=>this.signmethod()}/>
            </form>
            </Paper>
        </div>
        </section>
        )
    }
}
const style = {
    height: 330,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

export default Login;
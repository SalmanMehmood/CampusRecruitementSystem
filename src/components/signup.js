import React from 'react';
import * as firebase from 'firebase';
import {Tabs, Tab , Paper} from 'material-ui';
import {TextField ,RaisedButton} from 'material-ui';

class Signup extends React.Component{
    ref = firebase.database().ref();
    constructor(props){
        super(props);
        this.state={
            fullname : '',
            email : '',
            password : '',
            value : 'student'
        }
    }
    handleChange = (value) => {
        this.setState({
          value: value,
        });
      };
    sendstudentdata=()=>
    {
        const auth = firebase.auth();
        if(this.state.fullname === "" || this.state.email === ''  || this.state.password === '')
        {
            alert('Please complete all fields')
            this.setState({
                fullname : '',
                email : '',
                password : '',
            })  
        }
        else
        {
            const promise = auth.createUserWithEmailAndPassword(this.state.email , this.state.password);
            promise.then(()=>{
                firebase.auth().currentUser.updateProfile({
                    displayName : this.state.fullname
                })
                let uids = firebase.auth().currentUser.uid;
                firebase.database().ref(`Users/${uids}`).set({
                 name : this.state.fullname ,
                 email : this.state.email,
                 category : this.state.value,
                 key : uids
                })
                this.props.history.push("/studentlogin");
            })
            promise.catch(e=>{
                alert(e.message);
                this.setState({
                    fullname : '',
                    email : '',
                    password : ''
                })
            })
        }
    }
    
    render(){
        return(
            <section>
            <div className="App">
            <div style={style} zDepth={5} >
            <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab label="Student" value="student"  style={{backgroundColor :'#003333'}}>
            <Paper style={{marginTop : '5%' , height : '100%' , width : '100%' }} zDepth={5} >
                <h2 style={styles.headline}>Student Login</h2>
                <form>
                <div className ="App">
                    <TextField value={this.state.fullname} floatingLabelText="Full Name" onChange={(evt)=>this.setState({fullname : evt.target.value})}/>
                    <TextField value={this.state.email} floatingLabelText="Email Address" onChange={(evt)=>this.setState({email : evt.target.value})}/>
                    <TextField value={this.state.password} floatingLabelText="Password" type="password" onChange={(evt)=>this.setState({password : evt.target.value})}/><br/><br/>
                    <RaisedButton label="Sign Up" backgroundColor = '#003333' labelStyle={{color : 'white'}} onClick={this.sendstudentdata.bind(this)}/><br/><br/>
                </div>
            </form>
            </Paper>    
            </Tab>
            <Tab label="Company" value="Company"  style={{backgroundColor :'#003333'}}>
            <Paper  style={{marginTop : '5%', height : '100%' , width : '100%'}}  zDepth={5} >
                <h2 style={styles.headline}>Company Login</h2>
                <form>
                <div className ="App">
                    <TextField value={this.state.fullname} floatingLabelText="Company Name" onChange={(evt)=>this.setState({fullname : evt.target.value})}/>
                    <TextField value={this.state.email} floatingLabelText="Email Address" onChange={(evt)=>this.setState({email : evt.target.value})}/>
                    <TextField value={this.state.password} floatingLabelText="Password" type="password"onChange={(evt)=>this.setState({password : evt.target.value})}/><br/><br/>
                    <RaisedButton label="Sign Up"  backgroundColor = '#003333' labelStyle={{color : 'white'}} onClick={this.sendstudentdata.bind(this)}/><br/><br/>
                </div>
            </form>
                </Paper>
            </Tab>
          </Tabs>
          </div>
          </div>
          </section>
        )
    }
}
const styles = {
    headline: {
        textAlign : 'center',
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };
  const style = {
    
    height: 330,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
export default Signup;
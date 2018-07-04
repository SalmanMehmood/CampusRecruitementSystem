import React from 'react';
import * as firebase from 'firebase';
import {AppBar , Drawer , MenuItem } from 'material-ui';
import {Link} from 'react-router-dom';

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            Login_User_Name : '',
            category : '',
            open : false, 
        }
    }
    signout1=()=>{
        firebase.auth().signOut();
        this.setState({
            open : false,
        })
     }
    render(){
        return(
        <div>
            <AppBar
            title="Campus Recruitment System" style={{backgroundColor : '#003333'}}
            onLeftIconButtonClick={()=>{
                let user = firebase.auth().currentUser;
                if(user){
                firebase.database().ref(`Users/${user.uid}`).on('value',snap=>{
                    var data = snap.val();
                    this.setState({
                        Login_User_Name : data.name,
                        category : data.category,
                        open: !this.state.open,
                    })
                })
                }
            }}/>
        <div>
        <Drawer containerStyle={{backgroundColor:'#2F4F4F'}}
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem style={{color:'white'}} className="google">{`Category : ${this.state.category}`}</MenuItem>
          <MenuItem style={{color:'white'}} className="google">{this.state.Login_User_Name}</MenuItem>
          <Link to="/" ><MenuItem style={{color:'white'}} onClick={this.signout1}>SIGN OUT</MenuItem></Link>
        </Drawer>
      </div>
        </div>
        
        )
    }
}
export default Navigation;
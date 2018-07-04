import React from 'react';
import * as firebase from 'firebase';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Paper , TextField ,RaisedButton} from 'material-ui';

class UpdateInfo extends React.Component{

    constructor(){
        super();
        this.state={
            Skills : '',
            Experience : '',
            Education : ''
        }
    }
    componentDidMount(){
        let uids = firebase.auth().currentUser.uid;
            firebase.database().ref(`Users/${uids}`).on('value',snap=>{
                var data = snap.val();
                if(data){
                    this.setState({
                        Skills : data.Skills,
                        Experience : data.Experience,
                        Education : data.Education
                    })
                }
                else{
                   null
                }
            })
    }
    updateinfo=()=>{
        let uids = firebase.auth().currentUser.uid;
        if(this.state.Skills === '' ||  this.state.Education === '' || this.state.Experience === '' && this.state.Skills === undefined || this.state.Education === undefined || this.state.Experience === undefined){
            alert('Firstly Complete all fields...');
            this.setState({
                Skills : '',
                Experience : '',
            })
        }
        else{
            firebase.database().ref(`Users/${uids}`).update({
                Skills : this.state.Skills,
                Experience : this.state.Experience,
                Education : this.state.Education
            })
            alert("Successfully updated....")
        }
    }
    render(){
        return(
            <section>
            <div>    
                <Paper style={style} zDepth={5}>
                    <h1>Personal Information</h1>
                <form>
                    <div>
                        <TextField value={this.state.Skills} floatingLabelText="Skills" onChange={(evt)=>{this.setState({Skills:evt.target.value})}} />
                        <TextField value={this.state.Experience} floatingLabelText="Experience" onChange={(evt)=>{this.setState({Experience:evt.target.value})}}/>
                        <SelectField
                        floatingLabelText="Education"
                        value={this.state.Education}
                        onChange={(event, index, value)=>{this.setState({Education : value})}}
                      >
                        <MenuItem value='Matric' primaryText="Matric" />
                        <MenuItem value='Intermediate' primaryText="Intermediate" />
                        <MenuItem value='Bachelor' primaryText="Bachelor" />
                        <MenuItem value='Master' primaryText="Master" />
                        
                      </SelectField>
                    </div>
                    <br/>
                    <RaisedButton backgroundColor="purple" labelStyle={{backgroundColor: "purple" , color : 'white'}}  label="Update"onClick={()=>this.updateinfo()}/>
                </form>
                </Paper>
            </div>
            </section>
        )
    }
}
  const style = {
    height: 350,
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
export default UpdateInfo;
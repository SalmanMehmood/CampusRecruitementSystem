import React from 'react';
import {Paper , TextField ,RaisedButton ,TimePicker ,MenuItem ,SelectField} from 'material-ui';
import * as firebase from 'firebase';

class AddJobs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Skills : '',
            Position : '',
            Education : '',
            Experience : '',
            Shift : '',
            salary : '',
            Startjobtime: null,
            Endjobtime : null
        }
    }
    uploadjob = ()=>{
        let uids = firebase.auth().currentUser;
        let uids1 = uids.uid;
        let company_name = uids.displayName;
        if(this.state.Skills === "" || this.state.Position === ''  || this.state.Education === '' || this.state.Experience === '' || this.state.Shift === '' || this.state.salary === '')
        {
            alert('Please complete all fields') 
        }
        else{
            firebase.database().ref(`Jobs/`).push({
                keys : uids1,
                company_name : company_name,
                Skills : this.state.Skills,
                Position : this.state.Position,
                Education : this.state.Education,
                Experience : this.state.Experience,
                Shift : this.state.Shift,
                salary : this.state.salary
            })
            alert("Job Uploaded!!!")
            this.setState({
                Skills : '',
                Position : '',
                Education : '',
                Experience : '',
                Shift : '',
                salary : '',
                Startjobtime: '',
                Endjobtime : '',
            })
        }
    }
    render(){
        return(
            <div>    
                <Paper style={style} zDepth={5}>
                    <h1>Personal Information</h1>
                <form>
                <div>
                    <TextField floatingLabelText="Skills" onChange={(evt)=>{this.setState({Skills:evt.target.value})}} value={this.state.Skills}/>
                    <TextField floatingLabelText="Position" onChange={(evt)=>{this.setState({Position:evt.target.value})}} value={this.state.Position} />
                    <SelectField
                    floatingLabelText="Education"
                    value={this.state.Education}
                    onChange={(event, index, value)=>{this.setState({Education : value})}}>
                    <MenuItem value='Matric' primaryText="Matric" />
                    <MenuItem value='Intermediate' primaryText="Intermediate" />
                    <MenuItem value='Bachelors' primaryText="Bachelors" />
                    <MenuItem value='Masters' primaryText="Masters" />
                    </SelectField>

                    <SelectField
                    floatingLabelText="Experience"
                    value={this.state.Experience}
                    onChange={(event, index, value)=>{this.setState({Experience : value})}}>
                    <MenuItem value='1 Year' primaryText="1 Year" />
                    <MenuItem value='2 Year' primaryText="2 Year" />
                    <MenuItem value='3 Year' primaryText="3 Year" />
                    <MenuItem value='4 Year' primaryText="4 Year" />
                    <MenuItem value='5 Year' primaryText="5 Year" />
                    </SelectField>

                    <SelectField
                    floatingLabelText="Shift"
                    value={this.state.Shift}
                    onChange={(event, index, value)=>{this.setState({Shift : value})}}>
                    <MenuItem value='Morning' primaryText="Morning" />
                    <MenuItem value='Evening' primaryText="Evening" />
                    </SelectField>
                    
                    <TextField floatingLabelText="Salary" onChange={(evt)=>{this.setState({salary : evt.target.value})}} value={this.state.salary} />

                    <h3>Job Timing</h3>
                    <TimePicker
                    format="ampm"
                    hintText="12hr Format"
                    value={this.state.Startjobtime}
                    autoOk={true}
                    onChange={(event, date)=>{this.setState({Startjobtime: date})}}/>
                    <TimePicker
                    format="ampm"
                    hintText="12hr Format"
                    value={this.state.Endjobtime}
                    autoOk={true}
                    onChange={(event, date)=>{this.setState({Endjobtime: date})}}/>
                </div>
                <br/>
                    <RaisedButton backgroundColor = '#003333' labelStyle={{color : 'white'}}  label="Upload Job"onClick={()=>this.uploadjob()}/><br/><br/>
                </form>
                </Paper>
            </div>
        )
    }
}
const style = {
    width: 380,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
export default AddJobs;
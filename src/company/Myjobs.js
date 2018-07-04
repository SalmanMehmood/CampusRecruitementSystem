import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class MyJobs extends React.Component{
    constructor(){
        super();
        this.state={
            postjob : [],
            companyname : '',
            keys : [],
            uids : ''
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            let uids = user.uid;
            let name = user.displayName;
            this.setState({uids : uids , companyname : name })
        })
        firebase.database().ref(`Jobs/`).on('value',snap=>{
            let postjob = [];
            let keys = [];
            var data = snap.val();
            for(var key in data){
                if(data[key].keys === this.state.uids){
                    postjob.push(data[key]);
                    keys.push(key);
                }
            }
            this.setState({postjob : postjob , keys : keys}) 
        })
    }
    deletejob = (index)=>{
        firebase.database().ref(`Jobs/${this.state.keys[index]}`).remove();
    }
    render(){
        return(
        this.state.postjob.map((data,index)=>{
            var applyjob = [];
            if(data.Apply){
                 applyjob = Object.values(data.Apply); 
            }
            return(
            <div className="check1" key={index}>
            <div className="check2">
              <p><strong>Job : </strong>{data.Skills}</p>
              <h5><strong>Position : </strong>{data.Position}</h5>
            </div>
            <h1>{data.Education}</h1>
            <p>{data.Shift}</p>
            <p>{data.Experience}</p>
            <p>Salary: <strong>{data.salary}</strong></p>
            <div className="division">
                {applyjob.map((val,index)=>{
                    return(
                        <div key={index} >
                            <p>{val.Name}</p>
                            <p>{val.Education}</p>
                        <hr/>
                        </div>
                    )
                })}
                <br/>
            </div>
            <RaisedButton label="Delete"  backgroundColor = '#003333'onClick={()=>{this.deletejob(index)}} labelStyle={{color : 'white',marginTop:40}}/><br/><br/>
          </div>
            )
        })

        )
    }
}
export default MyJobs;

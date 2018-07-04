import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class Alljobsadmin extends React.Component{
    constructor(){
        super();
        this.state={
            Allpostedjobs : [],
            Allpostedjobkeys : []
        }
    }
    componentDidMount(){
        firebase.database().ref('Jobs/').on('value',snap=>{
            var data = [];
            var Allpostedjobs = [];
            var Allpostedjobkeys = [];
            data = snap.val();
            for(var key in data){
                Allpostedjobkeys.push(key)
                Allpostedjobs.push(data[key])
            }
            this.setState({Allpostedjobs : Allpostedjobs , Allpostedjobkeys : Allpostedjobkeys})
        })
    }
    deletejob = (index)=>{
        firebase.database().ref(`Jobs/${this.state.Allpostedjobkeys[index]}`).remove();
    }
    render(){
        return(
            this.state.Allpostedjobs.map((job,index)=>{
                var applyCandidate = [];
                if(job.Apply){
                    applyCandidate = Object.values(job.Apply)
                }
                return(
                    <div className="check111" key={index}>
                    <div className="check2">
                      <p>{job.company_name}</p>
                      <h5>{job.Position}</h5>
                    </div>
                    <h1>{job.Education}</h1>
                    <p>{job.Experience}</p>
                    <p>Salary: <strong>{job.salary}</strong></p>
                    <div className="division">
                        {applyCandidate.map((val,index1)=>{
                            return(
                                <div key={index1} >
                                    <p><strong>Name</strong>:{val.Name}</p>
                                    <p><strong>Education</strong>:{val.Education}</p>
                                <hr/>
                                </div>
                            )
                        })}
                        <br/>
                    </div>
                    <RaisedButton label="Delete" onClick={()=>{this.deletejob(index)}}  backgroundColor = '#003333'labelStyle={{color : 'white',marginTop:40}}/><br/><br/>
                  </div>
                )
            })

        )
    }
}
export default Alljobsadmin;
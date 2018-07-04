import React from 'react';
import * as firebase from 'firebase';
import {RaisedButton} from 'material-ui';

class AllJobs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            alljobs : [],
            jobkeys : [],
            checking :[],
            updateinfochecking : []
        }
    }
    componentDidMount(){
        let uids = firebase.auth().currentUser.uid;
        firebase.database().ref('Jobs/').on('value',snap=>{
            var alljobs = [];
            var jobkeys = [];
            var data = snap.val();
            for(var key in data){
                jobkeys.push(key);
                alljobs.push(data[key]);
            }
            this.setState({alljobs : alljobs , jobkeys : jobkeys , checking : data})
        })
        firebase.database().ref(`Users/${uids}`).on('value',snap=>{
            var data = [];
            data = snap.val();
            this.setState({updateinfochecking : data})
       })
    }
    checkupdatinfo=(index)=>{
        var data = this.state.updateinfochecking
        if(data.Education === undefined){
            alert('Firstly Update your Information..........');    
        }
        else{
            let uids = firebase.auth().currentUser.uid;
            var checking = this.state.checking;
            var values1 = Object.values(checking);
            var specificvalues = values1[index].Apply;
            if(specificvalues !== undefined){     
            if(specificvalues[uids] === undefined){
                firebase.database().ref(`Jobs/${this.state.jobkeys[index]}/Apply/${uids}`).update({
                userid : uids,
                Name : data.name,
                Education : data.Education,
                jobkey : this.state.jobkeys[index]
             })
             alert("successfully applied....")
            }
            else if(specificvalues[uids].Education !== data.Education){
                firebase.database().ref(`Jobs/${this.state.jobkeys[index]}/Apply/${uids}`).update({
                    userid : uids,
                    Name : data.name,
                    Education : data.Education,
                    jobkey : this.state.jobkeys[index]
                 })
                 alert("Applied changes successfully......")
            }
            else{
                alert("already applied......")
            }
        }
        else{
            firebase.database().ref(`Jobs/${this.state.jobkeys[index]}/Apply/${uids}`).update({
                userid : uids,
                Name : data.name,
                Education : data.Education,
                jobkey : this.state.jobkeys[index]
             })
             alert("successfully applied....")
        }
        }
    }
    render(){
        return(
            this.state.alljobs.map((data,index)=>{
                return(
                    <div className="check11" key={index}>
                    <div className="check22">
                      <p>{data.company_name}</p>
                      <h5>{data.Position}</h5>
                    </div>
                    <h1>{data.Education}</h1>
                    <p>{data.Experience}</p>
                    <p>Salary: <strong>{data.salary}</strong></p>
                    <RaisedButton label="Apply" onClick={()=>{this.checkupdatinfo(index)}}  backgroundColor = '#003333' labelStyle={{color : 'white'}}/><br/><br/>
                   </div>
                )
            })
        )
    }
}
export default AllJobs;
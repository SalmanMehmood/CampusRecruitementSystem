import React from 'react';
import * as firebase from 'firebase';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn } from 'material-ui/Table';
import {RaisedButton} from 'material-ui';


class Allstudentsadmin extends React.Component{
    constructor(){
        super();
        this.state={
            studata : [],
            stukeys : []
        }
    }
    componentDidMount(){
        firebase.database().ref('Users/').on('value',snap=>{
            var data = [];
            var studata = [];
            var stukeys= [];
            data = snap.val();
            for(var key in data){
                if(data[key].category === 'student'){
                    stukeys.push(key);
                    studata.push(data[key]);
                }
            }
            this.setState({studata : studata, stukeys : stukeys})
        })
    }
    Deletestudents = (index)=>{
        console.log(this.state.stukeys[index])
        firebase.database().ref(`Users/${this.state.stukeys[index]}`).remove()
    }
    render(){
        return(
            <div className = "container1">
                <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} >
                <TableRow style={{paddingLeft : 0 , backgroundColor : '#424949' }}>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>ID</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Student Name</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Student Email</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Student Qualification</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{paddingRight : 20 ,color:'white' , fontSize : 15}}><strong>Delete</strong></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true} style={{paddingLeft : 0}}>
                    {this.state.studata.map((data,index)=>{
                        return(
                            <TableRow key={index}>
                                <TableRowColumn style={{paddingLeft : 65}}>{index+1}</TableRowColumn>
                                <TableRowColumn>{data.name}</TableRowColumn>
                                <TableRowColumn>{data.email}</TableRowColumn>
                                <TableRowColumn style={{textAlign : 'center'}}>{data.Education}</TableRowColumn>
                                <TableRowColumn style={{paddingTop : 15}}><RaisedButton label="Delete" onClick={()=>{this.Deletestudents(index)}} backgroundColor = '#003333'labelStyle={{color : 'white',marginTop:40}}/><br/><br/></TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
                </Table>
            </div>
        )
    }
}
export default Allstudentsadmin;
import React from 'react';
import * as firebase from 'firebase';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn } from 'material-ui/Table';
import {RaisedButton} from 'material-ui';

class Allcompanyadmin extends React.Component{
    constructor(){
        super();
        this.state = {
            allcompanydata : [],
            allcompanyuids : []
        }
    }
    componentDidMount(){
        firebase.database().ref('Users/').on('value',snap=>{
            var data = [];
            var allcompanydata = [];
            var allcompanyuids = [];
            data = snap.val();
            for(var key in data){
               if(data[key].category === 'Company'){
                allcompanydata.push(data[key]);
                allcompanyuids.push(key);
               } 
            }
            this.setState({allcompanydata : allcompanydata ,allcompanyuids : allcompanyuids})
        })
    }
    DeleteCompany = (index)=>{
        console.log(this.state.allcompanyuids[index]);
        firebase.database().ref(`Users/${this.state.allcompanyuids[index]}`).remove()
    }
    render(){
        return(
            <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} >
                <TableRow style={{paddingLeft : 0 , backgroundColor : '#424949 ' }}>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>ID</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Company Name</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Company Email</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{paddingRight : 20 ,color:'white' , fontSize : 15}}><strong>Delete</strong></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={true} style={{paddingLeft : 0}}>
                {this.state.allcompanydata.map((data,index)=>{
                    return(
                        <TableRow key ={index} >
                            <TableRowColumn style={{paddingLeft : 65}}>{index+1}</TableRowColumn>
                            <TableRowColumn>{data.name}</TableRowColumn>
                            <TableRowColumn>{data.email}</TableRowColumn>
                            <TableRowColumn style={{paddingLeft : 15}}><RaisedButton label="Delete" onClick={()=>{this.DeleteCompany(index)}} backgroundColor = '#003333'labelStyle={{color : 'white',marginTop:40}}/></TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        )
    }
}
export default Allcompanyadmin;
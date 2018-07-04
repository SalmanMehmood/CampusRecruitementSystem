import React from 'react';
import * as firebase from 'firebase';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';

class AllCompany extends React.Component{
    constructor(){
        super();
        this.state={
            companydata : [],
        }
    }
    componentDidMount(){
        firebase.database().ref().child('Users/').on('value',snap=>{
            var companydata = [];
            var data = snap.val();
            for(var key in data){
                if(data[key].category === 'Company'){
                    companydata.push(data[key]);
                }
            }
            this.setState({
                companydata : companydata,
            })
        })
    }
    
    render(){
        return(
        <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} >
                <TableRow style={{paddingLeft : 0 , backgroundColor : '#424949 ' }}>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>ID</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Company Name</strong></TableHeaderColumn>
                    <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 15}}><strong>Company Email</strong></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={true} style={{paddingLeft : 0}}>
                {this.state.companydata.map((data,index)=>{
                    return(
                        <TableRow key ={index} >
                            <TableRowColumn style={{paddingLeft : 65}}>{index+1}</TableRowColumn>
                            <TableRowColumn>{data.name}</TableRowColumn>
                            <TableRowColumn>{data.email}</TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        )
    }
}
export default AllCompany;
import React from 'react';
import * as firebase from 'firebase';
import {Table, TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';

class AllStudents extends React.Component{
    constructor(props){
        super(props);
        this.state={
            All_student_data : []
        }
    }
    componentDidMount(){
        firebase.database().ref().child('Users/').on('value',snap=>{
            let data = snap.val();
            let All_student_data = [];
            for(var key in data){
                if(data[key].category === 'student'){
                    All_student_data.push(data[key]);
                }
            }
            this.setState({All_student_data : All_student_data})
        })
    }
    render(){
        return(
            <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false}  style={{backgroundColor : 'gray'}}>
              <TableRow style={{paddingLeft : 0 , backgroundColor : '#424949 '}} >
                <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 20}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 20}}>Student Name</TableHeaderColumn>
                <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 20}}>Student Email</TableHeaderColumn>
                <TableHeaderColumn style={{padding : 0 ,color:'white' , fontSize : 20}}>Student Qualification</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={true} style={{paddingLeft : 0}}>
            {this.state.All_student_data.map((data,index)=>{
                return(
                    <TableRow stripedrows='true' key={index}>
                        <TableRowColumn  style={{paddingLeft : 65}}>{index+1}</TableRowColumn>
                        <TableRowColumn>{data.name}</TableRowColumn>
                        <TableRowColumn>{data.email}</TableRowColumn>
                        <TableRowColumn>{data.Education}</TableRowColumn>
                    </TableRow>
                ) 
                  })}
            </TableBody>
          </Table>
        )
    }
}
export default AllStudents;
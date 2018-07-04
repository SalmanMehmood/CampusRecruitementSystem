import React from 'react';
import * as firebase from 'firebase';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab } from 'material-ui';
import AllCompany from '../student/AllCompany';
import AllJobs from '../student/AllJobs';
import UpdateInfo from '../student/Updateinfo';
import AddJobs from '../company/Addjobs';
import AllStudents from '../company/Allstudents';
import MyJobs from '../company/Myjobs';
import Allstudentsadmin from '../admin/Allstudents_admin'; 
import Alljobsadmin from '../admin/Alljobs_admin';
import Allcompanyadmin from '../admin/AllCompanies_admin';

class Student extends React.Component{
    ref = firebase.database().ref();
    constructor(props){
        super(props);
        this.state={
            category : '',
            slideIndex: 1,
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            var uid1 = user.uid;
            firebase.database().ref(`Users/${uid1}`).on('value',snap=>{
                var data = snap.val();
                if(data){
                  var category = data.category;
                  if(category === 'student'){
                      this.setState({category : category})      
                  }
                  else if(category === 'Company'){
                      this.setState({category : category})
                  }
                  else if(category === 'admin'){
                      this.setState({category : category})
                  }
                }
                else{
                  null
                }
        })
        })   
    }
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
    studentrender=()=>{
        return(
            <section>
            <div className="check">
                { this.state.category === 'admin' ?
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex} >
              <Tab label='All Students' value={0} style={{backgroundColor :'#003333'}}/>
              <Tab label='All Jobs'  value={1} style={{backgroundColor :'#003333'}}/>
              <Tab label='All Companies' value={2} style={{backgroundColor :'#003333'}}/>
            </Tabs> :
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex} >
              <Tab label={this.state.category === 'student' ? 'UpdateInfo' : 'Add Jobs'} value={0} style={{backgroundColor :'#003333'}}/>
              <Tab label={this.state.category === 'student' ? 'All Jobs' : 'My Jobs'} value={1} style={{backgroundColor :'#003333'}}/>
              <Tab label={this.state.category === 'student' ? 'All Companies' : 'All Students'} value={2} style={{backgroundColor :'#003333'}}/>
            </Tabs>
            }  
            { this.state.category === 'admin' ? 
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}>
              <div>
                {this.state.category === 'admin' ? <Allstudentsadmin/> : ''}
              </div>
              
              <div style={styles.slide}>
                {this.state.category === 'admin' ? <Alljobsadmin/>  : ''}
              </div>

              <div style={styles.slide}>
                {this.state.category === 'admin' ? <Allcompanyadmin/>  : ''}
              </div>
            </SwipeableViews> :
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}>
              <div>
                {this.state.category === 'student' ? <UpdateInfo/> : <AddJobs/>}
              </div>
              
              <div style={styles.slide}>
                {this.state.category === 'student' ? <AllJobs/> : <MyJobs/>}
              </div>

              <div style={styles.slide}>
                {this.state.category === 'student' ? <AllCompany/> :<AllStudents/>}
              </div>
            </SwipeableViews>
        }
          </div>
          </section>
        )
    }
    render(){
        return(
            <section>
                {this.studentrender()}
            </section>
        )
    }
}
const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    slide: {
      padding: 10,
    },
  };
export default Student;

/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import Issue from './Issue';
import { Section, Icon } from 'bloomer';

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueInfo: [],
      status: '',
      title: '',
      userLink: '',
      userImage: '',
      userName: '',
      labels: '',
    };
    
  };
  
  componentDidMount = async () => {
    const response = await fetch('https://api.github.com/repos/facebook/create-react-app/issues');
    const json = await response.json();
    console.log("this is the json", json);
    
    this.setState({
      issueInfo: json,
    })
  }
  
  
  // key={index}
  //      title={item.title}
  //      labels={item.labels}
  //      link={item.html_url}
  //      userGit={item.user.html_url}
  //      number={item.number} 
  //      user={item.user.login} 
  //      status={item.state}
  //      body={item.body}
  //      userImage={item.user.avatar_url}/>
  //     }) : <p>Have a tissue for your is
  
  
  render() {
    const { issueInfo } = this.state;
    const issues = !!issueInfo ? issueInfo.map( (item, index) => {
      const statusIcon = <Icon isSize="small" className="fas fa-exclamation-circle"/>
      const labelInfo = !!item.labels ? item.labels.map( label => {
        const color = {
          backgroundColor: `#${label.color}`,
          color: 'white',
        }
        return <div className="label" style={color}>{label.name}</div>})
         : '';
         
      const link = `/issues/${item.number}`
       return <Section className="issueBox">
                {statusIcon}
                <a href={link}>{item.title}</a>
                {labelInfo}
                <p>#{item.number} Opened by <a href={item.user.html_url} rel="noopener noreferrer">{item.user.name}</a> <img src={item.user.avatar_url} alt="user prifile pic"/> </p>
              </Section>      
    }) : '';
    
    
    
    
    return (
      <Section className="issueList">
        {issues}
      </Section>
    );
  }
  
  
  
}

export default IssueList;
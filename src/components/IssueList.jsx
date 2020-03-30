/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import Issue from './Issue'

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueInfo: [],
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
  
  
  render() {
    const { issueInfo } = this.state;
    const issues = !!issueInfo ? issueInfo.map( (item, index) => {
       return <Issue 
       title={item.title}
       labels={item.labels}
       link={item.html_url} 
       number={item.number} 
       user={item.user.login} 
       status={item.state} 
       userImage={item.user.avatar_url}/> 
      }) : <p>Have a tissue for your issue.</p>;
    
    return (
      <div>
        {issues}
      </div>
    );
  }
  
  
  
}

export default IssueList;
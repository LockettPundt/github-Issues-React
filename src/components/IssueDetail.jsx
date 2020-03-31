import React, { Component } from 'react';
import {Icon, Container, Section} from 'bloomer';
import Markdown from 'react-markdown/with-html';

class IssueDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueData: [],
      userImage: '',
      userName: '',
      userLink: '#',
      body: '',
      status: '',
    };
  };
  
  fetchIssue = async (num) => {
    const response = await fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${num}`);
    const json = await response.json();
    return json;
  }
  
  async componentDidMount() {
    const num = this.props.match.params.issue_number;
    const issueData = await this.fetchIssue(num);
    
    this.setState({
      issueData,
      userImage: issueData.user.avatar_url,
      body: issueData.body,
      status: issueData.status,
      userLink: issueData.user.html_url,
      userName: issueData.user.login,
    });
  }
  
  

  render() {
    
    const { issueData, userImage, userName, userLink, body, status } = this.state;
    const statusIcon = <Icon isSize="small" className="fas fa-exclamation-circle"/>
    const labelInfo = !!issueData.labels ? issueData.labels.map( item => {
      const color = {
        backgroundColor: `#${item.color}`,
        color: 'white',
      }
      return <div className="label" style={color}>{item.name}</div>})
       : '';
       
    return (
      <Section className="issueBox">
        {statusIcon}
        <a href={issueData.html_url} target="" rel="noopener noreferrer">{issueData.title}</a>
        <div className="labelBox">
        {labelInfo}
        </div>
        <p>#{issueData.number} Opened by <a href={userLink} rel="noopener noreferrer">{userName}</a> <img src={userImage} alt="user prifile pic"/> </p>
        <Markdown className="bodyText" source={body} escapeHtml={false} />
        <a href='/' rel="noopener noreferrer">Back</a>
      </Section>
      
    );
  }
}


export default IssueDetail;
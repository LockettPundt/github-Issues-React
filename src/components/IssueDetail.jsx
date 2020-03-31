/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Icon, Section } from 'bloomer';
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
    };
  }


  async componentDidMount() {
    const { issue_number } = this.props.match.params;
    const issueData = await this.fetchIssue(issue_number);

    this.setState({
      issueData,
      userImage: issueData.user.avatar_url,
      body: issueData.body,
      userLink: issueData.user.html_url,
      userName: issueData.user.login,
    });
  }

  fetchIssue = async (num) => {
    const response = await fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${num}`);
    const json = await response.json();
    return json;
  }


  render() {
    const {
      issueData, userImage, userName, userLink, body,
    } = this.state;
    const statusIcon = <Icon isSize="small" className="fas fa-exclamation-circle" />;
    const labelInfo = issueData.labels ? issueData.labels.map((item) => {
      const color = {
        backgroundColor: `#${item.color}`,
        color: 'white',
      };
      return <div className="label" style={color}>{item.name}</div>;
    })
      : '';

    return (
      <Section className="issueBox">
        {statusIcon}
        <a href={issueData.html_url} target="" rel="noopener noreferrer">{issueData.title}</a>
        <div className="labelBox">
          {labelInfo}
        </div>
        <p>
          #
          {issueData.number}
          {' '}
          Opened by
          {' '}
          <a href={userLink} rel="noopener noreferrer">{userName}</a>
          {' '}
          <img src={userImage} alt="user prifile pic" />
          {' '}
        </p>
        <Markdown className="bodyText" source={body} escapeHtml={false} />
        <a href="/" rel="noopener noreferrer">Back</a>
      </Section>

    );
  }
}


export default IssueDetail;

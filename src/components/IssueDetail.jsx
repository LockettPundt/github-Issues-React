/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon, Section } from 'bloomer';
import Markdown from 'react-markdown/with-html';
import axios from 'axios';


const IssueDetail = (props) => {
  const [issueData, setIssueData] = useState([]);


  useEffect(() => {
    const { issue_number } = props.match.params;
    const response = async () => {
      const result = await axios.get(`https://api.github.com/repos/facebook/create-react-app/issues/${issue_number}`);
      setIssueData(result.data);
    };
    response();
  }, []);

  const statusIcon = <Icon isSize="small" className="fas fa-exclamation-circle" />;
  const labelInfo = issueData.labels ? issueData.labels.map((item) => {
    const color = {
      backgroundColor: `#${item.color}`,
      color: 'white',
    };
    return <div className="label" style={color}>{item.name}</div>;
  })
    : '';
  const userInfo = issueData.user
    ? (
      <>
        <a href={issueData.user.html_url}>{issueData.user.login}</a>
        {' '}
        <img src={issueData.user.avatar_url} alt="user profile pic" />
      </>
    ) : '';
  return (
    <Section className="issueBox">
      {statusIcon}
      <a href={issueData.html_url} target="" rel="noopener noreferrer">{issueData.title}</a>
      <div className="labelBox">
        {labelInfo}
      </div>
      <div>
        #
        {issueData.number}
        {' '}
        Opened by
        {' '}
        {userInfo}
      </div>
      <Markdown className="bodyText" source={issueData.body} escapeHtml={false} />
      <a href="/" rel="noopener noreferrer">Back</a>
    </Section>

  );
};


export default IssueDetail;

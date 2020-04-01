
import React, { useState, useEffect } from 'react';
import { Section, Icon } from 'bloomer';
import axios from 'axios';

const IssueList = () => {
  const [issueInfo, setIssueInfo] = useState([]);


  useEffect(() => {
    const response = async () => {
      const result = await axios.get('https://api.github.com/repos/facebook/create-react-app/issues');
      setIssueInfo(result.data);
    };
    response();
  }, []);


  const issues = issueInfo ? issueInfo.map((item) => {
    const statusIcon = <Icon isSize="small" className="fas fa-exclamation-circle" />;
    const labelInfo = item.labels ? item.labels.map((label) => {
      const color = {
        backgroundColor: `#${label.color}`,
        color: 'white',
      };
      return <div className="label" style={color}>{label.name}</div>;
    })
      : '';

    const link = `/issues/${item.number}`;
    return (
      <Section className="issueBox">
        {statusIcon}
        <a href={link}>{item.title}</a>
        <div className="labelBox">
          {labelInfo}
        </div>
        <p>
          #
          {item.number}
          {' '}
          Opened by
          <a href={item.user.html_url} rel="noopener noreferrer">
            {' '}
            {item.user.login}
          </a>
          {' '}
          <img src={item.user.avatar_url} alt="user prifile pic" />
          {' '}
        </p>
      </Section>
    );
  }) : '';


  return (
    <Section className="issueList">
      {issues}
    </Section>
  );
};

export default IssueList;

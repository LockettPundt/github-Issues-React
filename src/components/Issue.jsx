/* eslint-disable no-unused-vars */
import React from 'react';
import {Icon, Container, Section} from 'bloomer';
import Markdown from 'react-markdown/with-html';

const Issue = (props) => {
  console.log(props);
  const { title, link, number, user, status, userImage, labels, userGit, body } = props;
  const statusIcon = status === "open" ? <Icon isSize="small" className="fas fa-exclamation-circle"/> : <Icon>{status}</Icon>;
  const labelInfo = !!labels ? labels.map( item => {
    const color = {
      backgroundColor: `#${item.color}`,
      color: 'white',
    }
    return <div className="label" style={color}>{item.name}</div>})
     : '';
     
  return (
  <Section className="issueBox">
    {statusIcon}
    <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
    <div className="labelBox">
     {labelInfo}
    </div>
    <p>#{number} Opened by <a href={userGit} rel="noopener noreferrer">{user}</a> <img src={userImage} alt="user prifile pic"/> </p>
    <Markdown className="bodyText" escapeHtml={false} source={body} />
  </Section>
  
  )
}


export default Issue;
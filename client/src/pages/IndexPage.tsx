import React, { Fragment } from 'react';
import Header from 'components/common/Header';
import ChatList from 'components/chat/ChatList';
import ChatHeader from 'components/chat/ChatHeader';
import ChatFooter from 'components/chat/ChatFooter';

export  default function IndexPage(props:any){
  return (
    <React.Fragment>
      <Header>
         <h1 className="title">🐖Greedy.Life</h1>
         <span className="signin">Login</span>
       </Header>
       <main>
          <div className="container">
            <div className="column" style={{flexBasis: '30%'}}>
              <div style={{background: 'rgba(0,0,0,0.2)', height: '300px'}}>
                <ChatHeader />
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', height: '300px'}}>
                <ChatHeader />
              </div>
            </div>
            <div className="column" style={{flexBasis: '40%'}}>
              <ChatHeader />
              <ChatList />
              <ChatFooter />
            </div>
            <div className="column" style={{flexBasis: '30%'}}>
              <div style={{background: 'rgba(0,0,0,0.2)', flexGrow: 1, height: 0}}>
                <ChatHeader />

              </div>
            </div>
          </div>
       </main>
    </React.Fragment>
  )
}
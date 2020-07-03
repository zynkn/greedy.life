import React, { Fragment } from 'react';
import Header from 'components/common/Header';
import ChatList from 'components/chat/ChatList';
import ChatHeader from 'components/chat/ChatHeader';
import ChatFooter from 'components/chat/ChatFooter';
import Sockette from 'sockette';

let ws:any = null;
export  default function IndexPage(props:any){

  // React.useEffect(()=>{
  //   ws = new Sockette('wss://ls82o57330.execute-api.ap-northeast-1.amazonaws.com/dev', {
  //     timeout: 5e3,
  //     maxAttempts: 10,
  //     onopen: e => console.log('Connected!', e),
  //     onmessage: e => console.log('Received:', e.data),
  //     onreconnect: e => console.log('Reconnecting...', e),
  //     onmaximum: e => console.log('Stop Attempting!', e),
  //     onclose: e => console.log('Closed!', e),
  //     onerror: e => console.log('Error:', e)
  //   });
  // },[]);
  // function send(){
  //   ws.json({action: 'joinChat', data: "Hello, I am using WebSocket APIs in API Gateway.", nickname:'Ediya' })
  // }
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
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', height: '300px'}}>
              </div>
            </div>
            <div className="column" style={{flexBasis: '40%'}}>
              <ChatHeader />
              <ChatList />
              <ChatFooter />
              {/* <button onClick={send}>Send</button> */}
            </div>
            <div className="column" style={{flexBasis: '30%'}}>
              <div style={{background: 'rgba(0,0,0,0.2)', flexGrow: 1, height: 0}}>

              </div>
            </div>
          </div>
       </main>
    </React.Fragment>
  )
}
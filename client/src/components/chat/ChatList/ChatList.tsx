import React from 'react';
import './ChatList.scss';
import face1 from 'static/images/face1.jpg';
import Sockette from 'sockette';
import socketio from 'socket.io-client';

const mock=[
  {
    nickname: 'Donald Trump',
    id: 1,
    message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolores delectus dolore est iste corporis repudiandae cum, a unde, repellat aspernatur magni exercitationem provident reiciendis eos debitis ex eligendi quaerat.`
  },{
    nickname: `Obama`,
    id: 0,
    message: 'Hi'
  }
]
// let wss:any = null;

const nickname = `Unknown ${Math.random().toFixed(2)}`;
export default function ChatList(props:any){
  const wss = React.useRef<any>(null);
  const [ chats, setChats] = React.useState<any>([]);
  const [count, setCount ] = React.useState<any>(0);
  React.useEffect(()=>{

    wss.current = new Sockette(`wss://ls82o57330.execute-api.ap-northeast-1.amazonaws.com/dev`,{
      timeout: 5e3,
      maxAttempts: 10,
      onopen: (e:any) => { console.log('Connected!', e);
        wss.current.json({
          action: 'join',
          nickname
        })
      },
      onmessage: (e:any) => {
        console.log('Received:', e.data);
        const {message, time, userCount} = JSON.parse(e.data);
        setCount(userCount);
        setChats((prev:any)=>{
          return [...prev, {message, time }]
        })
      },
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
  },[]);
  function join(){
    console.log('Send!')
    console.log(wss);
    wss.current.json({
      action: 'joinChat',
      nickname: nickname
    });


        // ws.send(JSON.stringify({
    //   action: 'joinChat',
    //   nickname: nickname
    // }));
  }

  return (
    <>
    <div className="ChatHeader">
      <span className="text --sm">현재 접속자 수 : {count}</span>
    </div>
    <div className="ChatList">
      {
        chats.map((item:any, index:number)=>{
          return <div key={index} className="DateDivider">
            {item.message}
          </div>
        })
      }
      {/* <div className="DateDivider">
        2020년 6월 30일
      </div> */}
      {/* <ChatItem role={1} /> */}
      {/* <div className="DateDivider">
        <b>마크롱</b> 님이 입장하였습니다.
      </div>
      <div className="DateDivider">
        <b>마크롱</b> 님이 퇴장하였습니다.
      </div> */}
      {/* <ChatItem role={0} />
      <ChatItem role={0} />
      <ChatItem role={1} message={'short'} /> */}

      {/* {
        new Array(222).fill(0).map((item)=>(<p>{item}ttt</p>))
      } */}
    </div>
    </>
  )
}

function ChatItem(props:any){
  
  return (
    <div className={`ChatItem ${props.role === 0 ? '--reversed': ''}`}>
      { props.role !== 0 && <div className="Avatar">
        <img src={face1} />
      </div>}
      <div className="content">
       {props.role !== 0 && <p className="nickname">Donald Trump</p>}
       <div className="message-wrap">
  {props.message ? <p className="message">{props.message}</p> : <p className="message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolores delectus dolore est iste corporis repudiandae cum, a unde, repellat aspernatur magni exercitationem provident reiciendis eos debitis ex eligendi quaerat.
        </p>}
        <span className="time">12:34</span>

        </div>
      </div>
    </div>
  )
}
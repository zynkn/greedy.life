import React from 'react';
import './ChatList.scss';
import face1 from 'static/images/face1.jpg';

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

export default function ChatList(props:any){
  return (
    <div className="ChatList">
      <div className="DateDivider">
        2020년 6월 30일
      </div>
      <ChatItem role={1} />
      <div className="DateDivider">
        <b>마크롱</b> 님이 입장하였습니다.
      </div>
      <div className="DateDivider">
        <b>마크롱</b> 님이 퇴장하였습니다.
      </div>
      <ChatItem role={0} />
      <ChatItem role={0} />
      <ChatItem role={1} message={'short'} />

      {/* {
        new Array(222).fill(0).map((item)=>(<p>{item}ttt</p>))
      } */}
    </div>
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
import React from 'react';
import './ChatHeader.scss';


export default function ChatHeader(props:any){
  return (
    <div className="ChatHeader">
      <span className="text --sm">현재 접속자 수 : 0</span>
    </div>
  )
}
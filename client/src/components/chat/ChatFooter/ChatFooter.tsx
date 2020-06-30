import React from 'react';
import './ChatFooter.scss';
import Button from 'components/common/Button'

export default function ChatFooter(props:any){

  return(
    <div className="ChatFooter">
      <input className="InputMessage" type="text" />
      <Button className="SendMessage">Send</Button>
    </div>
  )
}
import React from 'react';
import './Header.scss';

interface HeaderProps{
  [key:string]: any;
}

export default function Header({children}:HeaderProps){
  return (
    <header className="Header">
      {children}
    </header>
  )
}
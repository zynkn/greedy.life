import React from 'react';
import Header from 'components/common/Header';
import Pane from 'components/common/Pane';
import ChatList from 'components/chat/ChatList';
import IndexPage from 'pages/IndexPage';

function App() {
  return (
    <IndexPage />
    // <>
    //   <Header>
    //     <h1 className="title">🐖Greedy.Life</h1>
    //     <span className="signin">Login</span>
    //   </Header>
    //   <main>
    //     <div className="container">
    //       <div className="column" style={{flexGrow:7 }}>
    //         <div className="container">
    //           <div className="column" style={{flexGrow: 5}}>
    //             <Pane style={{height: '320px'}}>
    //               <h1 style={{fontSize: '48px'}}>1.234 x</h1>
    //             </Pane>
    //             <Pane>
    //               123123
    //             </Pane>
    //           </div>
    //           <div className="column" style={{flexGrow: 5}} >
    //             <Pane style={{height: '100%'}}>
    //               <ChatList />
    //               <div className="temp">
    //                 input
    //               </div>
    //             </Pane>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="column" style={{flexGrow:3}}>
    //       <Pane style={{height: '480px'}} />

    //       </div>
    //     </div>
    //   </main>
    // </IndexPage>
  );
}

export default App;

import React, { Component } from 'react';
import './chatclient.css';
import io from 'socket.io-client';
let loopCounter = 0;

// Random function for the App ==================================================================================================================
function showTipsPopUp () {

}
// The headerContent ============================================================================================================================
class HeaderContent extends Component {
  render() {
    return (
      <p id="headLine">AJS Labb 1 - Min Chatklient</p>
    );
  }
}
class ChatMessegnes extends Component {
  constructor(props) {
    super(props);
    this.state = { messagesArr: '' };
  };

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/');
    this.socket.on('messages', function(data) {
      this.setState({messagesArr: data});
    }.bind(this));
    this.socket.on('connect', function(){});
  }
  componentWillUnmount() {
    socket.on('disconnect', function(){});
  }
  render() {
    let getChatMess = this.state.messagesArr;
    return (
      <section className="messContainer">
        <header className="messHeader">
          <p></p> <p></p> <p>mess:3243</p>
        </header>
        <div className="messContent">
          {  }
        </div>
      </section>
    );
    for (let getChatMessStr of getChatMess) {
      let usernameStr = getChatMessStr['username'];
      // let chatMessStr = getChatMessStr['content'];
      // let timeStampStr = getChatMessStr['timestamp'];
      console.log(usernameStr);

    }
  }
}
// The mainContent
let socket;

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = { loginUsrName: '' };
    this.setYourUserName = this.setYourUserName.bind(this);
    this.setYourMess = this.setYourMess.bind(this);
  }
  setYourUserName(e) {
    this.setState({ loginUsrName: e.target.value });
  }
  setYourMess(e) {
    this.setState({ loginUsrName: e.target.value });
  }

  render() {
    let inputUsrName = this.state.loginUsrName;
    return (
      <div>
        <section id="view1">
          <div id="labelContainer">
            <label htmlFor="usernameStr" id="usrInputStr">Användarnamn <span className="inputReq"> *</span> </label></div>
            <div id="userContainer">
              <input type="text" id="usernameStr" minLength="1" maxLength="12" onChange={ this.setYourUserName } defaultValue={ this.state.loginUsrName } required/>
              <button id="usernameBtn">Logga In!</button>
            </div>
            <p id="showTipsPopUp">Vanliga tecken & siffor (- _  mellanslag. Max 12 tecken!)</p>
        </section>
        <section id="view2">
          <p id="chatWindow">Chatmeddelanden</p>
          <p id="usrStrView2">Ditt användarnamn: <span id="yourUsrName">{ inputUsrName }</span></p>
          <fieldset id="clientMessegnes">
            <legend id="chatMessegnesPlace">Meddelanden</legend>

            <ChatMessegnes/>

          </fieldset>
          <fieldset id="chatContainer">
            <legend>Ditt meddelande <span className="inputReq"> *</span> </legend>
            <textarea id="chatMessegnes" maxLength="200" placeholder="Max 200 tecken" required></textarea>
          </fieldset>
          <button id="closeBtn">Logga Ut</button>
        </section>
      </div>
    );
  }
}
// Application Chatclient
class Chatclient extends Component {
  render() {
    return (
      <div>
        <header id="header">
          <HeaderContent/>
        </header>
        <main id="content">
          <MainContent/>
        </main>

      </div>
    );
  }
}

export default Chatclient;

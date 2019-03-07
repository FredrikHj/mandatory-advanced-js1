import React, { Component } from 'react';
import './chatclient.css';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

//let loopCounter = 0;

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
// The ChatWindow - Child for Main Content ======================================================================================================
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], textInput: ''};

    this.messegnesAdd = this.messegnesAdd.bind(this);
    this.checkStrInput = this.checkStrInput.bind(this);
    this.setYourMess = this.setYourMess.bind(this);
    this.messagnesSend = this.messagnesSend.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.listen = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/');

    this.listen.on('messages', function(data) {
      for (let getChatMessObj of data) {
        this.messegnesAdd(getChatMessObj);
      }
    }.bind(this));
    this.listen.on('new_message', function(data) {
      console.log(data);
      this.messegnesAdd(data);
    }.bind(this));
    this.listen.on('connect', function(){});
  }

  componentWillUnmount() {
    listen.on('disconnect', function(){});
  }
  messegnesAdd(chattMessObj) {
    this.setState({ messages: [...this.state.messages, chattMessObj] });
  }
  setYourMess(e) {
    this.setState({ textInput: e.target.value });
  }
  messagnesSend() {
    // Get both string needed for sending the mess and last reset both state and the textarea for the mess
    let getUserName = document.querySelector('#yourUsrName').textContent;
    let getMessStr = this.state.textInput;

    let messBody = {
        username: getUserName,
        content: getMessStr
      }

    this.listen.emit('message', messBody);
    this.setState({ textInput: '' });
    document.querySelector('#chatMessegnes').value = '';
   }


  checkStrInput(e) {
    let incommingInput = e.target.value;
    let incommingInputSplitToTypeLetter = incommingInput.split('').pop();
    console.log(incommingInputSplitToTypeLetter);
    if (incommingInputSplitToTypeLetter === 'ö') {
      console.log('Fel tecken');
    }
  }

  logOut() {

  }

  render() {
    return (
      <section>
        <p id="chatWindow">Chatmeddelanden</p> <button id="closeBtn" onClick={ this.logOut } >Logga Ut</button>
        <p id="usrStrView2">Ditt användarnamn: <span id="yourUsrName">{ this.props.sendUsrName }</span></p>
        <fieldset>
          <legend>Meddelanden</legend>
            <ScrollToBottom className="messagnesReceive">
              {
                this.state.messages.map(obj => {
                  //console.log(this.state.messages);
                  return (
                    <section className="messContainer" key={obj.id}>
                      <header className="messHeader">
                        <p>{ obj.username }</p> <p>{ new Date(obj.timestamp ).toLocaleString('sv-SE') }</p>
                      </header>
                      <div className="messContent" >
                      { obj.content }
                      </div>
                      <hr className="middleLine"/>
                    </section>
                  );
                })
              }
            </ScrollToBottom>
            <hr className="middleLine"/>
        </fieldset>
        <fieldset id="messagneSend">
          <legend>Ditt meddelande <span className="inputReq"> *</span> </legend>
            <textarea id="chatMessegnes" maxLength="200" onChange={ this.setYourMess } required></textarea>
            <div id="finishMess"> <p> / 200 </p> <button id="sendBtn" onClick={ this.messagnesSend }> Sänd</button></div>
        </fieldset>
      </section>
    );
  }
}
// Main Content =================================================================================================================================
let listen;
class MainContent extends Component {
  constructor(props) {
    super(props);
    // Is sending into the ChatWindow
    this.state = { loginUsrName: '' };
    // ==============================

    this.logIn = this.logIn.bind(this);
    this.setYourUserName = this.setYourUserName.bind(this);
  }
  setYourUserName(e) {
    let incommingInput = e.target.value;
    this.setState({ loginUsrName: incommingInput });

    // if (incommingInput./[a-z0-9]/) {
    //   console.log('few');
    // }
    // let getAlphanumeric = /incommingInput/.test(/[a-z0-9]i/);
    // console.log(getAlphanumeric);


    // Validate the inputed usernamne in real time


    //
    //
    // let incommingInputSplitToTypeLetter = incommingInput.split('').pop();
    // console.log(getAlphanumeric);
    //
    // if (getAlphanumeric) {
    // }
    // // Check for just alphanumeric characters, -, _ and spaces
    // else if (incommingInput === '-'  || incommingInput === '_') {
    // }
    // // Send a error if fault
    //

    // let incommingInputSplitToTypeLetter = incommingInput.split('').pop();
    // console.log(incommingInputSplitToTypeLetter);
    // if (incommingInputSplitToTypeLetter === 'ö') {
    //   console.log('Fel tecken');
    // }
    // let strArray = [];
    // strArray.push();
    // console.log(strArray.split(''));
    // let getLastArrStr = strArray.pop();
    // console.log(getLastArrStr);
    // this.setState({textInput: e.target.value})
  }
  logIn() {

  }
  render() {
    return (
      //
      <div>
        <section id="view1">
          <div id="labelContainer">
            <label htmlFor="usernameStr" id="usrInputStr">Användarnamn <span className="inputReq"> *</span> </label></div>
            <div id="userContainer">
              <input type="text" id="usernameStr" minLength="1" maxLength="12" onChange={ this.setYourUserName } defaultValue={ this.state.loginUsrName } required/>
              <button id="usernameBtn" onClick={ this.logIn } >Logga In!</button>
            </div>
            <p id="showTipsPopUp">Vanliga tecken & siffor (- _  mellanslag. Max 12 tecken!)</p>
        </section>
        <section id="view2">
          <ChatWindow sendUsrName={ this.state.loginUsrName }/>
        </section>
      </div>
    );
  }
}
// Application Chatclient =======================================================================================================================
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

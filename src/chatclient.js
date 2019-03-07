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
// The ChatWindow ===============================================================================================================================
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], textInput: '' };
    this.messegnesAdd = this.messegnesAdd.bind(this);
    this.checkStrInput = this.checkStrInput.bind(this);
  };
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
  checkStrInput(e) {
    let incommingInput = e.target.value;
    let incommingInputSplitToTypeLetter = incommingInput.split('').pop();
    console.log(incommingInputSplitToTypeLetter);
    if (incommingInputSplitToTypeLetter === 'ö') {
      console.log('Fel tecken');
    }
    // let strArray = [];
    // strArray.push();
    // console.log(strArray.split(''));
    // let getLastArrStr = strArray.pop();
    // console.log(getLastArrStr);
    // this.setState({textInput: e.target.value})


  }
  render() {
    let textAreaFocus = this.state.textInput;
    return (
      <section>
        <fieldset>
          <legend>Meddelanden</legend>
            <section id="messagnesReceive">
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
                      <hr className="messMiddleLine"/>
                    </section>
                  );
                })
              }
            </section>
        </fieldset>
        <fieldset id="messagneSend">
          <legend>Ditt meddelande <span className="inputReq"> *</span> </legend>
          <textarea id="chatMessegnes" maxLength="200" placeholder="Max 200 tecken" onChange={ this.checkStrInput } required></textarea>
        </fieldset>
      </section>
    );
  }
}
// The ChatWindow ===============================================================================================================================
let listen;
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = { loginUsrName: '' };
    this.setYourUserName = this.setYourUserName.bind(this);
    //this.setYourMess = this.setYourMess.bind(this);
  }
  setYourUserName(e) {
    let incommingInput = e.target.value;
    let getAlphanumeric = incommingInput.replace(/[^a-z0-9]/gi, '');

    // Ta upp, detta fungerar men inte att lägga det i samma if med ||?
    if (getAlphanumeric) {
      this.setState({ loginUsrName: getAlphanumeric });
    }
    else if (incommingInput === '-'  || incommingInput === '_') {
      this.setState({ loginUsrName: getAlphanumeric });
    }
    // Check for just alphanumeric characters, -, _ and spaces


    // Validate the inputed usernamne

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

  // setYourMess(e) {
  //   this.setState({ loginUsrName: e.target.value });
  // }

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
          <section id="chatContainer">
            <ChatWindow/>
          </section>
          <button id="closeBtn">Logga Ut</button>
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

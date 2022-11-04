import React, { Component } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import steps from './steps.json';
import { Row } from 'antd';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }


  render() {
    return (

      <div className='centered-div'>
        <ChatBot
          steps={steps}
        />
      </div>
    );
  }
}

export default App;

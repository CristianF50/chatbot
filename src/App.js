import React, { Component } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';

import { Row } from 'antd';

class App extends Component {

  problemas( value ) {
    switch (value) {
      case 1: return "internet";
      break;
      case 2: return "télefono";
      break;
    }
  }

  contacto( value ) {
    switch (value) {
      case 1: return "correo electronico";
      break;
      case 2: return "teléfono celular";
      break;
    }
  }

  render() {

    let steps = [
      {
        id: 1,
        message: "Hola,  ¿Cuál es tu nombre?",
        trigger: 'nombre'
      },
      {
        id: 'nombre',
        user: true,
        trigger: 3
      },
      {
        id: 3,
        message: "Que tal ! {previousValue}, ¿Cómo te puedo ayudar?",
        trigger: 'accion'
      },
      {
        id: 'accion',
        options: [
          { value: 1, label: "Mi internet no funciona", trigger: 5},
          { value: 2, label: "Mi télefono no funciona", trigger: 5 }
        ]
      },
      {
        id: 5,
        message: `Muy bien permiteme un momento ...`,
        trigger: 6
      },
      {
        id: 6,
        message: ({ previousValue, steps }) => `${steps.nombre.value}, Podrias describir un poco mas tu problema con el ${this.problemas(steps.accion.value)}?`,
        trigger: 'descripcion'
      },
      {
        id: 'descripcion',
        user: true,
        trigger: 7
      },
      {
        id: 7,
        message: ({previousValue, steps}) => `Gracias ${steps.nombre.value}, tienes alguna otra forma de contacto ?`,
        trigger: 'tipo_contacto'
      },
      {
        id: 'tipo_contacto',
        options: [
          { value: 1, label: "Correo Electronico", trigger: 8},
          { value: 2, label: "Teléfono Celular", trigger: 8 }
        ]
      },
      {
        id: 8,
        message: ({steps}) => `De acuerdo, podrias proveer tu ${this.contacto(steps.tipo_contacto.value)} ?`,
        trigger: 'contacto'
      },
      {
        id: 'contacto',
        user: true,
        trigger: 9
      },
      {
        id: 9,
        message: ({steps}) => `De acuerdo, vamos a confirmar tus datos, tu nombre es ${steps.nombre.value}, estas teniendo problemas con tu ${this.problemas(steps.accion.value)}, quieres que te contactemos via ${this.contacto(steps.tipo_contacto.value)} al ${this.contacto(steps.tipo_contacto.value)}:  ${steps.contacto.value}, ¿es correcto?`,
        trigger: 'verificacion'
      },
      {
        id: 'verificacion',
        options: [
          { value: true, label: "Si", trigger: 10},
          { value: false, label: "No", trigger: 11 }
        ]
      },
      {
        id: 10,
        message: ({steps}) => `Gracias ${steps.nombre.value}, por verificar tu informacion, un agente se pondra en contacto contigo en breve al ${this.contacto(steps.tipo_contacto.value)}: ${steps.contacto.value}.`,
        end: true
      },
      {
        id: 11,
        message: "De acuerdo, selecciona la opcion que deseas modificar",
        trigger: 'update_options'
      },
      {
        id: 'update_options',
        options: [
          { value: 1, label: "Nombre", trigger: 'update-nombre'},
          { value: 2, label: "Problema", trigger: 'update-problema' },
          { value: 3, label: "Contacto", trigger: 'update-contacto' }
        ]
      },
      {
        id: 'update-nombre',
        update: 'nombre',
        trigger: 9
      },
      {
        id: 'update-problema',
        update: 'accion',
        trigger: 12,
      },
      {
        id: 12,
        message: ({ previousValue, steps }) => `${steps.nombre.value}, Podrias describir un poco mas tu problema con el ${this.problemas(steps.accion.value)}?`,
        trigger: 13
      },
      {
        id: 13,
        update: 'descripcion',
        trigger: 9,
      },

      {
        id: 'update-contacto',
        update: 'tipo_contacto',
        trigger: 14
      },
      {
        id: 14,
        update: 'contacto',
        trigger: 9,
      },

    ]
  

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

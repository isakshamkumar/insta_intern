import React from "react";
import "./App.css";
import Navigator from "./navigator";
import { Provider } from 'react-redux';
import store from './components/redux/store';

export default function App() {

  return (
   
      <div className="App">
        <Navigator/>
      </div>
   
  );
}

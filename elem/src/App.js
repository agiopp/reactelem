import './App.css';

import City from './xuanmengyu/city'
import Search from './xuanmengyu/search'
import React, { Component } from 'react'
import Home from './zhangzhishuai/home'
import {Route,BrowserRouter} from 'react-router-dom'
export class App extends Component {
  

  render() {
    return (
      <div className="App">
      <BrowserRouter>
      <Route path= "/home" component={Home}/>
      <Route exact path="/" component={City}/>
      <Route path="/search" component={Search}/>
      </BrowserRouter>
    </div>
    )
  }
}

export default App




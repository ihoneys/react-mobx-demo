import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { action, autorun, observable, makeObservable, computed } from 'mobx'
import { observer, Provider } from 'mobx-react'
import RootStore from './stores';


class Timer {
  secondsPassed = 0
  constructor() {
    makeObservable(this, {
      secondsPassed: observable
    })
  }
  increaseTimer() {
    this.secondsPassed += 1
  }
}

const myTimer = new Timer()
const TimerView = observer(({ timer }) => <span>Seconds passed: { timer.secondsPassed }</span>)


ReactDOM.render(
  <React.StrictMode>
    {/* <TimerView timer={ myTimer } /> */ }
    <Provider { ...new RootStore() }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// setInterval(() => {
//   myTimer.increaseTimer()
// }, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

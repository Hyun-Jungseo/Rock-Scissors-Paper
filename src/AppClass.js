import React, { Component } from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";

const choice = {
  rock: {
    name: "Rock",
    img: "https://media.istockphoto.com/photos/stone-pebble-gray-picture-id1288973456?b=1&k=20&m=1288973456&s=170667a&w=0&h=GBGgp4yrZv4ooDBws8yHF24sJ3rkEpObYsBWpVNKFT8=",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.ikea.com/kr/en/images/products/sy-scissors__0112301_pe263788_s5.jpg?f=s",
  },
  paper: {
    name: "Paper",
    img: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
  },
};

export default class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
    };
  }

  play = (userChoice) => {
    const computerChoice = this.randomChoice();
    this.setState({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      result: this.judgement(choice[userChoice], computerChoice),
    });
  };
  randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };
  judgement = (user, computer) => {

    // user === computer 비김(tie)
    // user === rock, computer === scissors user 이김
    // user === rock, computer === paper user 짐
    // user === scissors, computer === paper user 이김
    // user === scissors, computer === rock user 짐
    // user === paper, computer === rock user 이김
    // user === paper, computer == scissors user 짐

    if(user.name === computer.name) {
      return "tie";
    } else if(user.name === "Rock") {
        return computer.name === "Scissors" ? "win" : "lose"
      }
      else if(user.name === "Scissors") {
        return computer.name === "Paper" ? "win" : "lose"
      }
      else if(user.name === "Paper") {
        return computer.name === "Rock" ? "win" : "lose"
      };
  };

  render() {
    return (
      <div>
        <div className="main">
          <BoxClass title="You" item={this.state.userSelect} result={this.state.result}/>
          <BoxClass title="Computer" item={this.state.computerSelect} result={this.state.result}/>
        </div>
        <div className="main">
          <button onClick={() => this.play("scissors")}>가위</button>
          <button onClick={() => this.play("rock")}>바위</button>
          <button onClick={() => this.play("paper")}>보</button>
        </div>
      </div>
    );
  }
}
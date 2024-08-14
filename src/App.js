import {useState} from 'react';
import './App.css';
import Box from './component/Box';


// 1. 박스 2개 (타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4 번의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 테두리 색이 바뀐다. (이기면 초록, 지면 빨강, 비기면 검정)

const choice = {
  rock:{
    name:"Rock",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0iRqU33nTGLszyNGvLn39CRDpmWjk9iHbKQ&s"
  },
  scissors:{
    name:"Scissors",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCn2leEIpH_ZiItC5OYvzuovtDOwEJjJpGbn9bxuGy5CL0J4m3wT_VGs0YPZPfI0uWUHc&usqp=CAU"
  },
  paper:{
    name:"Paper",
    img:"data:image/png;base64,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"
  },
};

function App() {
  const [userSelect,setUserSelect] = useState(null);
  const [computerSelect,setComputerSelect] = useState(null);
  const [result,setResult]=useState("");
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    const computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(jubgement(choice[userChoice],computerChoice));
  };


  const randomChoice = () => {
    // 객체에서 랜덤한 아이템을 선택해줘야함
    // Math.random 함수는 숫자만 리턴 가능
    // 객체 => 배열화 시키고
    // Math.random 함수에서 리턴된 숫자를 배열에 인덱스랑 매치를 시켜서 랜덤아이템을 뽑을수 있다
    
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 어레이로 만들어 주는 함수다.
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value", randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  };


  const jubgement = (user,computer) => {
    console.log("user", user, "computer", computer);

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
      }
  }

  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={result}/>
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
};

export default App;

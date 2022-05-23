
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {useEffect} from "react"
import { io, Socket } from "socket.io-client";

interface GameWindowProps {
  width: number;
  height: number;

  initBallX: number;
  initBallY: number;
  ballRadius: number;
  ballSpeed:number;

  paddleWidth: number;
  paddleHeight: number;
  paddleSpeed: number;

}
interface GameState {
  // Game variables
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;

  paddleOneX: number;
  paddleOneY: number;

  paddleTwoX: number;
  paddleTwoY: number;

  state: 0 | 1 | 2; // 0 waiting for player to join // 1 playing // 2 opponent left  
  players : Array<string>;
}
const min = (a : number , b : number)=>{
  return a < b ? a : b;
}
const max = (a : number , b : number)=>{
  return a > b ? a : b;
}
  
const Pong: React.FC<GameWindowProps> = (props: GameWindowProps) => {

  //STATE
  let ballX : number = props.initBallX;
  let ballY : number = props.initBallY;
  let ballDirX: number = 1;
  let ballDirY: number = 1;

  let paddleOneX : number = 0;
  let paddleOneY : number = 0;

  let paddleTwoX : number = props.width - props.paddleWidth;
  let paddleTwoY : number = 0;

  let mousePressed : boolean = false;

  let state : 0 | 1 | 2 = 0;
  let players : Array<string> = []
	
  const drawBall = (p5: p5Types) => {
		p5.ellipse(ballX, ballY, props.ballRadius, props.ballRadius);
	};

  const updateBall = (p5: p5Types) => {
    //update
    ballX += props.ballSpeed * ballDirX;
    ballY += props.ballSpeed * ballDirY;

    //no overlap ?
    if (ballDirX > 0)
      ballX = min(ballX, props.width-props.ballRadius/2);
    else
      ballX = max(ballX, props.ballRadius/2);
    if (ballDirY > 0)
      ballY = min(ballY, props.height-props.ballRadius/2);
    else
      ballY = max(ballY, props.ballRadius/2);

    //collision
    if (ballX + props.ballRadius/2 >= props.width || ballX - props.ballRadius/2 <= 0)
      ballDirX *= -1;
    if (ballY + props.ballRadius/2 >= props.height || ballY - props.ballRadius/2 <= 0)
      ballDirY *= -1;
	};

  const drawPaddleOne = (p5 : p5Types) =>{
    p5.rect(paddleOneX,paddleOneY,props.paddleWidth, props.paddleHeight);
  }
  const drawPaddleTwo = (p5 : p5Types) =>{
    p5.rect(paddleTwoX,paddleTwoY,props.paddleWidth, props.paddleHeight);
  }
  const updatePaddleOne= (p5: p5Types) =>{

    if (!mousePressed){
  
      //handle keys

      return ;
    }

    // console.log(p5.mouseX,p5.mouseY)
    if (p5.mouseY > paddleOneY + props.paddleHeight / 2 + props.paddleSpeed)
    {
      //paddleOneY += props.paddleSpeed;
      //console.log("going down");
      
      socket.emit("playerInput",{input:"DOWN"})
      console.log("sending input player One")

    }
    else if(p5.mouseY < paddleOneY + props.paddleHeight / 2 - props.paddleSpeed)
    {
      //paddleOneY -= props.paddleSpeed;
      //console.log("going up");

      socket.emit("playerInput",{input:"UP"})
      console.log("sending input player One")

    }
    return 
    if (p5.mouseY > paddleOneY + props.paddleHeight / 2)
      paddleOneY = min(paddleOneY, props.height - props.paddleHeight);
    else
      paddleOneY = max(paddleOneY, 0);
  }
  const updatePaddleTwo= (p5: p5Types) =>{

    if (!mousePressed){
  
      //handle keys

      return ;
    }

    // console.log(p5.mouseX,p5.mouseY)
    if (p5.mouseY > paddleTwoY + props.paddleHeight / 2 + props.paddleSpeed)
    {
      //paddleTwoY += props.paddleSpeed;
      //console.log("going down");
      
      socket.emit("playerInput",{input:"DOWN"})
      //console.log("sending input player Two")

    }
    else if(p5.mouseY < paddleTwoY + props.paddleHeight / 2 - props.paddleSpeed)
    {
      //paddleTwoY -= props.paddleSpeed;
      //console.log("going up");

      socket.emit("playerInput",{input:"UP"})
      //console.log("sending input player Two")
    }
    return 
    if (p5.mouseY > paddleTwoY + props.paddleHeight / 2)
      paddleTwoY = min(paddleTwoY, props.height - props.paddleHeight);
    else
      paddleTwoY = max(paddleTwoY, 0);
  }
  
  // ball paddle collision
  const handlePaddleOneBounce= (p5: p5Types) =>{
  
    if (
         ballDirX === -1 
      && ballY > paddleOneY
      && ballY < paddleOneY + props.paddleHeight // ball in front of paddle and going toward paddle
    ){
      // console.log("in paddle one range")
      ballX = max(ballX, props.ballRadius/2 + props.paddleWidth);
      if (ballX - props.ballRadius/2 - props.paddleWidth <= 0)
        ballDirX *= -1;
    }
  }
  const handlePaddleTwoBounce= (p5: p5Types) =>{
  
    if (
         ballDirX === 1 
      && ballY > paddleTwoY
      && ballY < paddleTwoY + props.paddleHeight // ball in front of paddle and going toward paddle
    ){
      // console.log("in paddle two range")

      ballX = min(ballX, props.width - props.ballRadius/2 - props.paddleWidth);

      if (ballX + props.ballRadius/2 + props.paddleWidth >= props.width)
        ballDirX *= -1;
    }
  }
  const applyState = () => {

  }
  // SETUP
  let canvas : p5Types.Renderer;
  let socket : Socket;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    socket = io("ws://localhost:3001");

		canvas = p5.createCanvas(props.width, props.height).parent(canvasParentRef);
    canvas.mousePressed(()=>{mousePressed = true});
    canvas.mouseReleased(()=>{mousePressed = false});

    socket.emit("playerJoined");

    socket.on("gameState",(data: GameState)=>{
      //console.log(data);
      ballX = data.ballX;
      ballY = data.ballY;
      ballX = data.ballX
      ballY = data.ballY
      ballDirX = data.ballDirX
      ballDirY = data.ballDirY
      paddleOneX = data.paddleOneX
      paddleOneY = data.paddleOneY
      paddleTwoX = data.paddleTwoX
      paddleTwoY = data.paddleTwoY
      state = data.state
      players = data.players
    })
	};
  useEffect(() => {
    //console.log("bruh")
    return () => {
      canvas.remove();
      socket.close();
    };
  }, []);

  // DRAW
	const draw = (p5: p5Types) => {

		p5.background(0);
    p5.frameRate(60);

    if (!state){
      p5.fill(0xffffff)
      p5.textSize(40)
      p5.text("Waiting for opponent to join...",50, props.height/2)
      return ;
    }
    if (state == 2){
      p5.fill(0xffffff)
      p5.textSize(40)
      p5.text("Opponent disconnected, refresh to play again...",50, props.height/2, )
      return ;
    }

    //ball
		drawBall(p5);
		//updateBall(p5);

    //paddle one
    drawPaddleOne(p5);
    if (players.indexOf(socket.id) == 0)
      updatePaddleOne(p5);

    //paddle two
    drawPaddleTwo(p5);

    if (players.indexOf(socket.id) == 1)
    updatePaddleTwo(p5);

    // game logic ?

    // handlePaddleOneBounce(p5);
    // handlePaddleTwoBounce(p5);

	};

	return <Sketch setup={setup} draw={draw} />;
};


//Render using :
      // <Pong 
      //   width={1000} height={700}
      //   initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10} 
      //   paddleWidth={30} paddleHeight={150} paddleSpeed={10} 
      //   />

export default Pong
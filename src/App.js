import React, { Component } from 'react';
import {OBSTRUCTION,VISITED,UNVISITED,PATH,SPEED, MAX_ROW, MAX_COL, MAX_SPEED} from './Constant'
import cssClasses from'./Board.module.css';
import {populate} from './DataPopulation/Poputate'
import {createBoad} from './DataPopulation/CreateBoad'
import Toolbar from './Toolbar/Toolbar';
import {depathFirstSearch} from './algorithums/DepthFirstSearch';
import {breadthFirstSearch} from './algorithums/BreadthFirstSearch';
import {diskstraAlgo} from './algorithums/Dijkstra'
import {diskstraAlgo2} from './algorithums/Dijkstra'
import {aStarAlgo} from './algorithums/AStarAlgo'
import {aStarAlgoWeight} from './algorithums/AStarAlgoWeight'
import {swarmAlgo} from './algorithums/SwarmAlgo'
import {randomObstructionMazeAlgo} from './Maze/RandomObstructionMaze'
import {randomConnectionMazeAlgo} from './Maze/randomConnectionMazeAlgo'
import {recursiveDivisonMaze} from './Maze/RecursiveDivision'
class App extends Component {
  constructor()
  {
    super()
    populate(this.board,this.board_dict);
    this.setState({
      board:this.board,
      board_dict:this.board_dict,
    })
    this.state={
      board:this.board, // board
      board_dict:this.board_dict,// map of cells
      algorithums:["BFS","DFS","Dijkstra","A-Star","Greedy-bfs","Swarm"],
      algorithumFunction:[this.bfs,this.dfs,this.dijkstra,this.aStar,this.greadyBfs,this.swarm],
      mazeAlogrithums:["Random Obstruction","Random Connection","Recursive Division"],
      mazeFunction:[this.randomObstructionMaze,this.randomConnectionMaze,this.recursiveDivison],
      crrAlgorithumId:-1,
      crrMazeID:-1,
      crrAlgorithum:"",
      crrMaze:"",
      start:7+"-"+20,
      starti:7,
      startj:20,
      end:7+"-"+45,
      endi:7,
      endj:45,

      showWeight:false,
      disableAll:false,
      weight:false,
     
    }
    document.title="Path-Envisage"; 
  
    
 }
  board=[];
  board_dict={};
  
  
  
  cellClickHandler=(key)=>{
    if(key===this.state.start || key===this.state.end|| this.state.disableAll===true)return;
    
    let currStatu=this.state.board_dict[key].state;
    this.setState((oldState)=>{
      let tempState=Object.assign({},oldState)
      tempState.board_dict[key].state=currStatu!==OBSTRUCTION?OBSTRUCTION:UNVISITED;
      tempState.board[tempState.board_dict[key].i][tempState.board_dict[key].j].state=currStatu!==OBSTRUCTION?OBSTRUCTION:UNVISITED;
      return {tempState}

    });
    if(currStatu!==OBSTRUCTION) 
    {
      document.getElementById(key).className=cssClasses.obstruction;
    }
    else document.getElementById(key).className=cssClasses.unvisited;
      
        

  }
  visualizeHandler=()=>
  {
    if(this.state.crrAlgorithumId===-1){
      alert("Select Algorithum first");
      return;
    }
    
    this.state.algorithumFunction[this.state.crrAlgorithumId]();

  }
  clearBoadHandler=(all)=>
  {
    
  
    for (let i = 0; i < MAX_ROW; i++) {
      for (let j = 0; j < MAX_COL; j++){
        document.getElementById(i+'-'+j).className=cssClasses.unvisited;
                
        if(all)
        {
          
          if(this.state.board_dict[i+"-"+j].state===OBSTRUCTION)
          {
            this.setState(this.updateHelp(i+"-"+j,OBSTRUCTION,cssClasses.obstruction))
            document.getElementById(i+'-'+j).className=cssClasses.obstruction;
                

          }
          else this.setState(this.updateHelp(i+"-"+j,UNVISITED,cssClasses.unvisited))

        }
        else{
          this.setState(this.updateHelp(i+"-"+j,UNVISITED,cssClasses.unvisited))
        }


      }
    }
  }
  updateHelp=(id,status,css)=>
  {
    return (pre)=>{
      let state=Object.assign({},pre);
      state.board_dict[id].state=status;
      state.board[state.board_dict[id].i][state.board_dict[id].j].state=status;
      return{state};
    }

  }
  mazeSelecterHandler=(key)=>
  {
    var name=this.state.mazeAlogrithums[key]
    this.setState({
      crrMazeID:key,
      crrMaze:name,
    })
    this.state.mazeFunction[key]();
  }
  algorithumSelecterHandler=(key)=>
  {
    this.setState({
      crrAlgorithum:this.state.algorithums[key],
      crrAlgorithumId:key
    
    })
    

  }
  weightHandler=()=>{
    let ans=this.state.showWeight?false:true;
    this.setState({
      showWeight:ans,
      weight:ans,
    })

  }

  dfs=()=> {
    this.setState({disableAll:true});
    this.clearBoadHandler(true);
    let grid=JSON.parse(JSON.stringify(this.state.board_dict));
    let src=grid[this.state.start];
    let dst=grid[this.state.end];
    let currentCell,visitedQueue,path;
    let result=depathFirstSearch(src,grid,dst);
    visitedQueue=JSON.parse(JSON.stringify(result[0]));
    path=JSON.parse(JSON.stringify(result[1]));
    var interval=setInterval(()=>{
      if(visitedQueue.length===0 && path.length===0)
      {
        this.setState({disableAll:false});
        clearInterval(interval);
      }
      else if(visitedQueue.length!==0)
      {

        currentCell=grid[visitedQueue.shift()];
        document.getElementById(currentCell.id).className=cssClasses.visited;
      }
      else{
        currentCell=grid[path.pop()];
        document.getElementById(currentCell.id).className=cssClasses.path;
      }
    },SPEED);
  }
  bfs=()=>{
    this.setState({disableAll:true});
    this.clearBoadHandler(true);
    let grid=JSON.parse(JSON.stringify(this.state.board_dict));
    let src=grid[this.state.start];
    let dst=grid[this.state.end];
    let currentCell,visitedQueue,path;
    let result=breadthFirstSearch(src,grid,dst);
    visitedQueue=JSON.parse(JSON.stringify(result[0]));
    path=JSON.parse(JSON.stringify(result[1]));
    var interval=setInterval(()=>{
      if(visitedQueue.length===0 && path.length===0)
      {
        this.setState({disableAll:false});
        clearInterval(interval);
      }
      else if(visitedQueue.length!==0)
      {

        currentCell=grid[visitedQueue.shift()];
        document.getElementById(currentCell.id).className=cssClasses.visited;
      }
      else{
        currentCell=grid[path.pop()];
        document.getElementById(currentCell.id).className=cssClasses.path;
      }
    },SPEED);
  }
  dijkstra=()=>{this.setState({disableAll:true});
  this.clearBoadHandler(true);
  let grid=JSON.parse(JSON.stringify(this.state.board_dict));
  let src=grid[this.state.start];
  let dst=grid[this.state.end];
  let currentCell,visitedQueue,path;
  let result
  if(this.state.showWeight)
  {
    result=diskstraAlgo(src,grid,dst);
    
  }
  else{
    result=diskstraAlgo2(src,grid,dst);
  
  }


  visitedQueue=JSON.parse(JSON.stringify(result[0]));
  path=JSON.parse(JSON.stringify(result[1]));
  var interval=setInterval(()=>{
    if(visitedQueue.length===0 && path.length===0)
    {
      this.setState({disableAll:false});
      clearInterval(interval);
    }
    else if(visitedQueue.length!==0)
    {

      currentCell=grid[visitedQueue.shift()];
      document.getElementById(currentCell.id).className=cssClasses.visited;
    }
    else{
      currentCell=grid[path.pop()];
      document.getElementById(currentCell.id).className=cssClasses.path;
    }
  },SPEED);
}
aStar=()=>{this.setState({disableAll:true});
  this.clearBoadHandler(true);
  let grid=JSON.parse(JSON.stringify(this.state.board_dict));
  let src=grid[this.state.start];
  let dst=grid[this.state.end];
  let currentCell,visitedQueue,path;
  let heuristic=[];
  let row=[];
  for(let i=0;i<MAX_ROW;i++)
  {
    row=[];
    for(let j=0;j<MAX_COL;j++)
    {
      row.push(Math.abs(i-this.state.endi)+Math.abs(j-this.state.endj)+Math.abs(i-this.state.starti)+Math.abs(j-this.state.startj)/2);
    }
    heuristic.push(row);
  }
  let result;
  if(this.state.showWeight)
{
  result=aStarAlgoWeight(src,grid,dst,heuristic);

}
else{
 result=aStarAlgo(src,grid,dst,heuristic);
}

  visitedQueue=JSON.parse(JSON.stringify(result[0]));
  path=JSON.parse(JSON.stringify(result[1]));
  var interval=setInterval(()=>{
    if(visitedQueue.length===0 && path.length===0)
    {
      this.setState({disableAll:false});
      clearInterval(interval);
    }
    else if(visitedQueue.length!==0)
    {

      currentCell=grid[visitedQueue.shift()];
      document.getElementById(currentCell.id).className=cssClasses.visited;
    }
    else{
      currentCell=grid[path.pop()];
      document.getElementById(currentCell.id).className=cssClasses.path;
    }
  },SPEED);
}
greadyBfs=()=>{this.setState({disableAll:true});
this.clearBoadHandler(true);
let grid=JSON.parse(JSON.stringify(this.state.board_dict));
let src=grid[this.state.start];
let dst=grid[this.state.end];
let currentCell,visitedQueue,path;
let heuristic=[];
let row=[];
for(let i=0;i<MAX_ROW;i++)
{
  row=[];
  for(let j=0;j<MAX_COL;j++)
  {
    row.push(Math.abs(dst.i-i)+Math.abs(j-dst.j));
  }
  heuristic.push(row);
}
let result;
if(this.state.showWeight)
{
  result=aStarAlgoWeight(src,grid,dst,heuristic);

}
else{
result=aStarAlgo(src,grid,dst,heuristic);
}
visitedQueue=JSON.parse(JSON.stringify(result[0]));
path=JSON.parse(JSON.stringify(result[1]));
var interval=setInterval(()=>{
  if(visitedQueue.length===0 && path.length===0)
  {
    this.setState({disableAll:false});
    clearInterval(interval);
  }
  else if(visitedQueue.length!==0)
  {

    currentCell=grid[visitedQueue.shift()];
    document.getElementById(currentCell.id).className=cssClasses.visited;
  }
  else{
    currentCell=grid[path.pop()];
    document.getElementById(currentCell.id).className=cssClasses.path;
  }
},SPEED);
}

swarm=()=>{this.setState({disableAll:true});
this.clearBoadHandler(true);
let grid=JSON.parse(JSON.stringify(this.state.board_dict));
let src=grid[this.state.start];
let dst=grid[this.state.end];
let currentCell,visitedQueue,path;
let heuristic=[];
let row=[];
for(let i=0;i<MAX_ROW;i++)
{
  row=[];
  for(let j=0;j<MAX_COL;j++)
  {
    row.push(Math.abs(dst.i-i)+Math.abs(j-dst.j)); // manhaten grid
  }
  heuristic.push(row);
}
let result;
if(this.state.showWeight)
{
  for(let i=0;i<MAX_ROW;i++)
{
  for(let j=0;j<MAX_COL;j++)
  {
    heuristic[i][j]=this.state.board[i][j].weight;    // manhaten gird+weight
  }
}

  result=swarmAlgo(src,grid,dst,heuristic);

}
else{
result=swarmAlgo(src,grid,dst,heuristic);
}
visitedQueue=JSON.parse(JSON.stringify(result[0]));
path=JSON.parse(JSON.stringify(result[1]));
var interval=setInterval(()=>{
  if(visitedQueue.length===0 && path.length===0)
  {
    this.setState({disableAll:false});
    clearInterval(interval);
  }
  else if(visitedQueue.length!==0)
  {

    currentCell=grid[visitedQueue.shift()];
    document.getElementById(currentCell.id).className=cssClasses.visited;
  }
  else{
    currentCell=grid[path.pop()];
    document.getElementById(currentCell.id).className=cssClasses.path;
  }
},SPEED);
}


randomObstructionMaze=()=>{
this.setState({disableAll:true});
this.clearBoadHandler(); // all
//let dict=JSON.parse(JSON.stringify(this.state.board_dict));

let boad=createBoad();
let dict=boad[0];
let matrix=boad[1];


//let matrix=JSON.parse(JSON.stringify(this.state.board));
let currentCell;
let src=dict[this.state.start];
let dst=dict[this.state.end];
  
let visitedQueue=randomObstructionMazeAlgo(src,dst,matrix,dict);
var inter=setInterval(()=>{
  if(visitedQueue.length===0)
  {
     this.setState({
          board:matrix,
          board_dict:dict,
          disableAll:false
      },()=>{});
       
      clearInterval(inter);
  }
  else{
      currentCell=dict[visitedQueue.shift()];
      //this.setState(updateState,afterUpdate);
      document.getElementById(currentCell.id).className=cssClasses.obstruction;
  }
},MAX_SPEED);


}
randomConnectionMaze=()=>{
  this.setState({disableAll:true});
  this.clearBoadHandler(); // remove all the animatin
  //let dict=JSON.parse(JSON.stringify(this.state.board_dict));

let boad=createBoad();
let dict=boad[0];
let matrix=boad[1];


//let matrix=JSON.parse(JSON.stringify(this.state.board));
let currentCell;
  let src=dict[this.state.start];
  let dst=dict[this.state.end];
    
  let visitedQueue=randomConnectionMazeAlgo(src,dst,matrix,dict);
  var interval=setInterval(()=>{
    if(visitedQueue.length===0)
    {
       this.setState({
            board:matrix,
            board_dict:dict,
            disableAll:false
        },()=>{});
         
        clearInterval(interval);
    }
    else{
        currentCell=dict[visitedQueue.shift()];
        document.getElementById(currentCell.id).className=cssClasses.obstruction;
    }
  },MAX_SPEED);
  
  
  }
  recursiveDivison=()=>{
    this.setState({disableAll:true});
  this.clearBoadHandler(); // all
  //let dict=JSON.parse(JSON.stringify(this.state.board_dict));

let boad=createBoad();
let dict=boad[0];
let matrix=boad[1];


//let matrix=JSON.parse(JSON.stringify(this.state.board));
let currentCell;
  let src=dict[this.state.start];
  let dst=dict[this.state.end];
    
  let visitedQueue=recursiveDivisonMaze(src,dst,matrix,dict);
  var inter=setInterval(()=>{
    if(visitedQueue.length===0)
    {
       this.setState({
            board:matrix,
            board_dict:dict,
            disableAll:false
        },()=>{});
         
        clearInterval(inter);
    }
    else{
        currentCell=dict[visitedQueue.shift()];
        document.getElementById(currentCell.id).className=cssClasses.obstruction;
    }
  },MAX_SPEED);
  
  } 
  setEnd=(x,y)=>{
    if(x<0 || y<0 || x>MAX_ROW-1 || y>MAX_COL-1 )
    {
      alert("Enter the valid index");
      this.setState({
        endi:this.state.endi,
        endj:this.state.endj,
        end:this.state.end,
      })
      return ;
    }
    this.setState({
      endi:x,
      endj:y,
      end:x+"-"+y
    })
  }
  
   

  
  setStart=(x,y)=>{
    if(x<0 || y<0 || x>MAX_ROW-1 || y>MAX_COL-1 )
    {
      alert("Enter the valid index");
      this.setState({
        starti:this.state.starti,
        startj:this.state.startj,
        start:this.state.start,
      })
      return ;
    }
    this.setState({
      starti:x,
      startj:y,
      start:x+"-"+y
    })
  }
  
  
  
  
  

 
    
  render() {
    
    return (
    
      <div className="App">
        <div >
        <Toolbar visualizeHandler={this.visualizeHandler} 
        clearBoadHandler={this.clearBoadHandler}
        algorithumSelecterHandler={this.algorithumSelecterHandler}
        mazeSelecterHandler={this.mazeSelecterHandler}
        algorithums={this.state.algorithums}
        mazeAlogrithums={this.state.mazeAlogrithums}
        crrMaze={this.state.crrMaze}
        crrAlgorithum={this.state.crrAlgorithum}
        weightHandler={this.weightHandler}
        disableAll={this.state.disableAll}
        show={this.state.showWeight}
        setStart={this.setStart}
        setEnd={this.setEnd}
        startx={this.state.starti}

        starty={this.state.startj}
        endx={this.state.endi}
        endy={this.state.endj}


        ></Toolbar>
        </div>
        <div style={{width:'100%' ,textAlign:'center'}}>
        <table style={{width:'100%',textAlign:'center'}}><thead>
          {this.state.board.map((item,i)=>{
            return <tr
            key={i}
            id={i}
              >
              {item.map((jitem)=>{
                return <td
                style={{
                  border:'1px solid black',
                  textAlign:'center',
                  width:'24px',
                  height:'24px',
                  
                  
                }}
                key={jitem.id}
                id={jitem.id}
                className={jitem.state===UNVISITED?cssClasses.unvisited:jitem.state===VISITED?cssClasses.visited:jitem.state===OBSTRUCTION?cssClasses.obstruction:jitem.state===PATH?cssClasses.path:null }
                onClick={()=>this.cellClickHandler(jitem.id)}
                >
                  <i className={jitem.id===this.state.start ? "fa fa-street-view":
                  jitem.id===this.state.end?" fa fa-bullseye":" "
                  
                }
                style={this.state.start===jitem.id?{color:'black'}:this.state.end===jitem.id?{color:'black'}:null }
                  >
                    {this.state.start===jitem.id?"":this.state.end===jitem.id?"":this.state.showWeight?jitem.weight:" " }</i>
                 
                </td>   
              })
              }
            </tr>
          })



          }
          </thead>
          </table>
          
          </div>
          <div className="outer">
            <h2 className="inner">Nikhilsoni-stack</h2>&nbsp;&nbsp;
            <a className="fa fa-facebook" target="_blank" href="https://www.facebook.com/nikhil.soni.1675"></a>&nbsp;&nbsp;
            <a className="fa fa-instagram"target="_blank" href="https://www.instagram.com/the.el_dorado/"></a>&nbsp;&nbsp;
            <a className="fa fa-github" target="_blank" href="https://github.com/nikhilsoni-stack"></a>&nbsp;&nbsp;
            <a className="fa fa-linkedin" target="_blank" href="https://www.linkedin.com/in/nikhil-soni-stack"></a>&nbsp;&nbsp;
            
            
          </div>
      </div>
    );
  }

}

export default App;

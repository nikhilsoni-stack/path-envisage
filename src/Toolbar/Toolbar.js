import React, {  useState } from 'react';
import './Toolbar.css';
const toolbar=(prop)=>{
 
  
  const [startx,setStartx]=useState({
    startx:parseInt(JSON.stringify(prop.startx),10)
  })
  const [starty,setStarty]=useState({
    starty:parseInt(JSON.stringify(prop.starty),10)
  })
  const [endx,setEndx]=useState({
    endx:parseInt(JSON.stringify(prop.endx),10)
  })
  const [endy,setEndy]=useState({
    endy:parseInt(JSON.stringify(prop.endy),10)
  })
  const startxChange=(event)=>
  {
    setStartx({
      startx:event.target.value
    })

  }
  const startyChange=(event)=>
  {
    setStarty({
      starty:event.target.value
    })

  }
  const endxChange=(event)=>
  {
    setEndx({
      endx:event.target.value
    })

  }
  const endyChange=(event)=>
  {
    setEndy({
      startx:event.target.value
    })

  }
 
 
    return (
      
    <div className="pad" >
<div className="center topheader" > 
<h2 className=" hh centert">Path Envisage</h2>        


</div>
<div className="outer">
                <div className="inner">
                <button className="btn btn-outline-primary dropdown-toggle mr-5 btn-lg waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={prop.disableAll}>Algorithm:{prop.crrAlgorithum}</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                 {prop.algorithums.map((item,index)=>{
                   return <a
                     className="dropdown-item "   onClick={()=>prop.algorithumSelecterHandler(index)} href="#"
                     key={index}
                     >
                       {item}

                   </a>
                 })}
                </div>
                </div>  
                <div className="inner" >

                <button type="button" onClick={()=>prop.visualizeHandler()}className="btn btn-outline-success btn-space btn-lg " disabled={prop.disableAll}>Visualise</button>
                </div>
                <div className="inner">
                <button className="btn-space btn btn-outline-primary dropdown-toggle mr-5 btn-lg waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={prop.disableAll}>Maze:{prop.crrMaze}</button>
  
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {prop.mazeAlogrithums.map((item,index)=>{
                   return <button
                   className="dropdown-item" onClick={()=>prop.mazeSelecterHandler(index) } type="button"
                     key={index}>
                       {item}

                   </button>
                 })}
                


                </div>
                </div>
                
      
    </div>
    <div className="outer">
                <div  className="inner">
                <button type="button" onClick={()=>prop.clearBoadHandler()}className="btn btn-outline-danger btn-space btn-lg float " disabled={prop.disableAll}>Clear Board</button>
                {/* <button type="button" onClick={()=>prop.setStart()}  className="btn btn-outline-secondary btn-space btn-lg float" disabled={prop.disableAll}>StartPonit</button> */}
                <button type="button" className="btn btn-outline-secondary btn-space btn-lg float" data-toggle="modal" data-target="#myModal" disabled={prop.disableAll}>Start Point</button>


                <button type="button" onClick={()=>prop.weightHandler()}  className="btn btn-outline-dark btn-space btn-lg float" disabled={prop.disableAll}>{prop.show?"Remove":"Add"} Weight</button>
                {/* <button type="button" onClick={()=>prop.setEnd()}  className="btn btn-outline-secondary btn-space btn-lg float" disabled={prop.disableAll}>End Point</button>
                 */}
                 <button type="button" className="btn btn-outline-secondary btn-space btn-lg float" data-toggle="modal" data-target="#myModal1" disabled={prop.disableAll}>End Point</button>

                <button type="button" onClick={()=>prop.clearBoadHandler(1)}className="btn btn-outline-danger btn-space btn-lg float " disabled={prop.disableAll}>Clear Path</button>
    </div>
    </div>   




    <div className="modal" id="myModal1">
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Set End Point</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      <div className="modal-body">
      <label>Start-X:</label>&nbsp;&nbsp;
      <input type="number" className="inputcss"  maxLength="5"  onChange={endxChange} id="endx" aria-describedby="emailHelp"  value={endx.endx}></input>&nbsp;
      <label>Start-Y:</label>&nbsp;&nbsp;
      <input type="number" className="inputcss"  maxLength="5" id="endy" onChange={endyChange} aria-describedby="emailHelp"  value={endy.endy}></input>
    
        
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-outline-info" data-dismiss="modal" onClick={()=>prop.setEnd(document.getElementById("endx").value ,document.getElementById("endy").value)}>Set</button>
      </div>

    </div>
  </div>
</div>



    <div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Set Start Point</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      <div className="modal-body">
      <label>Start-X:</label>&nbsp;&nbsp;
      <input type="number" className="inputcss"  maxLength="5"  onChange={startxChange} id="startx" aria-describedby="emailHelp"  value={startx.startx}></input>&nbsp;
      <label>Start-Y:</label>&nbsp;&nbsp;
      <input type="number" className="inputcss"  maxLength="5" id="starty" onChange={startyChange} aria-describedby="emailHelp"  value={starty.starty}></input>
    
        .
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-outline-info" data-dismiss="modal" onClick={()=>prop.setStart(document.getElementById("startx").value ,document.getElementById("starty").value)}>Set</button>
      </div>

    </div>
  </div>
</div>   
  </div>
);


}
export default toolbar;






{/* <div className="pad" >
<div className="center topheader" > 

<h2 className=" hh centert">Path Visualize</h2>        


</div>
<div className="outer">
<div className="container">
        <div className="row ">
            <div className="col-lg-12 btn-group btn-group-toggle centert">
                <div  className="inner">
                <div className="dropdown show floatd ">
                <button className="btn btn-primary dropdown-toggle mr-5 btn-lg waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={prop.disableAll}>Algorithm:{prop.crrAlgorithum}</button>
               <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                 {prop.algorithums.map((item,index)=>{
                   return <a
                     className="dropdown-item" onClick={()=>prop.algorithumSelecterHandler(index)} href="#"
                     key={index}
                     >
                       {item}

                   </a>
                 })}
                </div>  
                </div>
                <div className="dropdown show floatr">
                
                <button className="btn-space btn btn-primary dropdown-toggle mr-5 btn-lg waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={prop.disableAll}>Maze:{prop.crrMaze}</button>
  
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {prop.mazeAlogrithums.map((item,index)=>{
                   return <button
                   className="dropdown-item" onClick={()=>prop.mazeSelecterHandler(index) } type="button"
                     key={index}>
                       {item}

                   </button>
                 })}


                </div>
                </div>
                <button type="button" onClick={()=>prop.visualizeHandler()}className="btn btn-success btn-space btn-lg " disabled={prop.disableAll}>Visualize</button>
                
                </div>
            </div>
        </div>
    </div>
    </div>
    <button type="button" onClick={()=>prop.weightHandler()}  className="btn btn-primary btn-space btn-lg float" disabled={prop.disableAll}>{prop.show?"Remove":"Add"} Weight</button>
                
                <button type="button" onClick={()=>prop.clearBoadHandler()}className="btn btn-warning btn-space btn-lg float " disabled={prop.disableAll}>Clear</button>
                
   
  </div> */}
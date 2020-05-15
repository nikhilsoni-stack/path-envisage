import {MAX_COL, MAX_ROW,UNVISITED} from '../Constant'
export function createBoad()
{
    var board=[];
    var board_dict={};
    var n=MAX_ROW
    var m=MAX_COL
    
    for (let i = 0; i < n; i++) {
      var temp=[];
      for (let j = 0; j < m; j++){
        let k= Math.floor(Math.random() *9)+1;
        temp.push({
          id:i+"-"+j,
          i:i,
          j:j,
          state:UNVISITED,
          weight: k,
          style:" ",
          cost:0,
          

        });
        
        
        board_dict[temp[j].id]=temp[j];
        
        
      }
      board.push(temp);
    }
    

    return [board_dict,board];

}




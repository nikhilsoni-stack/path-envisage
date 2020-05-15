import {OBSTRUCTION,MAX_COL,MAX_ROW}from "../Constant"
export function randomConnectionMazeAlgo(src,dst,matrix,dict)
{
    let visitedQueue=[];
    let queue=[];
    let i=0;let j=0;
    let r=[-1,0,1,0];
    let c=[0,-1,0,1];
    let currentCell;
    let hashkey;
    let k;
    let flag=true;
     for(let ii=0;ii<MAX_ROW;ii+=2)
    {
        for(let jj=0;jj<MAX_COL;jj++)
        {
            if((dict[ii+"-"+jj]===src|| dict[ii+"-"+jj]===dst))continue;
            if(flag)
            {
                flag=false;
                currentCell=dict[ii+"-"+jj];
                visitedQueue.push(currentCell.id);
                dict[currentCell.id].state=OBSTRUCTION;
                matrix[currentCell.i][currentCell.j].state=OBSTRUCTION;
                queue.push(currentCell)


            }else flag=true;
            
            
        }
    }
    // for(let ii=1;ii<MAX_ROW;ii+=2)
    // {
    //     for(let jj=0;jj<MAX_COL;jj++)
    //     {
    //         if((dict[ii+"-"+jj]===src|| dict[ii+"-"+jj]===dst))continue;
    //         k= Math.floor(Math.random() *10)+1;
            
    //         if(k>5)
    //         {
    //             currentCell=dict[ii+"-"+jj];
    //             visitedQueue.push(currentCell.id);
    //             dict[currentCell.id].state=OBSTRUCTION;
    //             matrix[currentCell.i][currentCell.j].state=OBSTRUCTION;
    //         }   


            
            
    //     }
    // }
    

   
    

            
          while(queue.length!==0)
         {
        //   alert(queue.length);
        
        currentCell=queue.shift();
       
        for(let a=0;a<r.length;a++)
        {
            
            i=currentCell.i+r[a];
            j=currentCell.j+c[a];
            hashkey=i+"-"+j;
            if(i<0 || j<0 || i>=MAX_ROW || j>=MAX_COL)continue;
            k= Math.floor(Math.random() *10)+1;
            if(dict[i+"-"+j] &&  k>=7 && dict[i+"-"+j]!==src && dict[i+"-"+j]!==dst)
            {
                visitedQueue.push(hashkey);
                dict[hashkey].state=OBSTRUCTION;
                matrix[i][j].state=OBSTRUCTION;
        
                
                //queue.push(dict[hashkey]);
                
            }
        
        }
            
        
    
    }
    

            
            
            
    



    
    return visitedQueue;
}

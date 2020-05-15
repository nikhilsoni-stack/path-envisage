import {OBSTRUCTION,MAX_COL,MAX_ROW}from "../Constant"
export function randomObstructionMazeAlgo(src,dst,matrix,dict)
{
    let visitedQueue=[];
    let hashkey;
    for(let i=0;i<MAX_ROW;i++)
    {
        for(let j=0;j<MAX_COL;j++)
        {
            hashkey=i+"-"+j;
            let k= Math.floor(Math.random() *10)+1;
            if(k>=7 && dict[i+"-"+j]!==src && dict[i+"-"+j]!==dst) 
            {
                dict[hashkey].state=OBSTRUCTION;
                matrix[i][j].state=OBSTRUCTION;
            visitedQueue.push(hashkey);
            }
        }
    }

    
    return visitedQueue;
}

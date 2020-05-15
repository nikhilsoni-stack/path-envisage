import {VISITED,OBSTRUCTION,PATH,MAX_COL,MAX_ROW}from "../Constant"
import {PriorityQueue} from '../DataPopulation/PriorityQueue'
export function swarmAlgo(src,grid,dst,heuristic)
{
    let currentCell,i,j,hashkey;
    let queue=new PriorityQueue();
    let visitedQueue=[];
    let previous={};
    let result=[];
    let item;
    let cost=1;
    let r=[-1,0,1,0];
    let c=[0,-1,0,1];
    queue.add(src,0);
    let found=0;
    

    while(!queue.isEmpty())
    {
        
        item=queue.remove();
        currentCell=item.element;
        cost=item.priority;
        if(currentCell.state===VISITED)continue;
        if(currentCell.id===dst.id)
        {
            found=1
            visitedQueue.push(currentCell.id)
            currentCell.state=VISITED;
            break;
        }
        currentCell.state=VISITED;
        visitedQueue.push(currentCell.id);
        for(let a=0;a<r.length;a++)
        {
            
            i=currentCell.i+r[a];
            j=currentCell.j+c[a];
            hashkey=i+"-"+j;
            if(i<0 ||  j<0  || i>=MAX_ROW  || j>=MAX_COL) continue;
            if(grid[hashkey])
            {
            if(grid[hashkey].state===OBSTRUCTION || grid[hashkey].state===VISITED) continue;
            let pweight=cost+heuristic[i][j];
            queue.add(grid[hashkey],pweight);
            let weight=previous[hashkey]?previous[hashkey][0]:Infinity;
            if(weight>pweight)previous[hashkey]=[pweight,currentCell.id];
        }
        
        }
    }
    
    let node =dst.id;
    let path=[];
    if(found===1)
    {
    while(1)
    {
        if(node)
        {
            
            path.push(node);
            grid[node].state=PATH;
            node=previous[node][1];
            if(node===src.id)
            {
                path.push(node);
                grid[node].state=PATH;
                break;
            }
        }
        else  break;
        
    }
}
    result=[visitedQueue,path];
    return result;
}

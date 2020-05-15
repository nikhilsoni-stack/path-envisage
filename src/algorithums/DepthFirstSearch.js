import {VISITED,PATH,UNVISITED}from "../Constant"
export function depathFirstSearch(src,grid,dst)
{
    let currentCell,i,j,hashkey;
    let stack=[];
    let visitedQueue=[];
    let previous={};
    let result=[];
    let r=[-1,0,1,0];
    let c=[0,-1,0,1];
    stack.push(src);
    let found=0;

    while(stack.length!==0)
    {
        
        currentCell=stack.pop();
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
            if(grid[hashkey] && grid[hashkey].state===UNVISITED)
            {
                stack.push(grid[hashkey])
                previous[hashkey]=currentCell.i+"-"+currentCell.j;
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
            node=previous[node];
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

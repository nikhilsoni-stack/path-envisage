import { OBSTRUCTION,MAX_COL,MAX_ROW } from '../Constant';
export function recursiveDivisonMaze(src,dst,matrix,dict)
{

    let visitedQueue=[];
    for(let y=MAX_COL-1;y>=0;y--) 
    {addToVisitedQueue(visitedQueue,src,dst,0,y,dict,matrix);    
    }
    for(let x=0;x<MAX_ROW;x++) {
        addToVisitedQueue(visitedQueue,src,dst,x,0,dict,matrix);}
    for(let y=0;y<MAX_COL;y++) {
        addToVisitedQueue(visitedQueue,src,dst,MAX_ROW-1,y,dict,matrix);}
    for(let x=MAX_ROW-1;x>=0;x--) {
        addToVisitedQueue(visitedQueue,src,dst,x,MAX_COL-1,dict,matrix);}
    let minI,minJ,maxI,maxJ,mid;
    minJ=minI=2;
    maxI=MAX_ROW-2;
    maxJ=MAX_COL-2;
    let stack=[];
    stack.push([minI,minJ,maxI,maxJ,true]);
    let cell;
    
    while(stack.length!==0)
    {
        if(stack.length===100) break;
        cell=stack.pop();
        minI=cell[0];
        minJ=cell[1];
        maxI=cell[2];
        maxJ=cell[3];
        if(cell[4]){
            if(maxI-minI<2) continue;
            mid=Math.floor(randNumber(minJ, maxJ)/2)*2;
            vertical(visitedQueue,src,dst,minI,maxI,mid,dict,matrix);
            stack.push([minI,minJ,maxI,mid-1,!cell[4]]);
            stack.push([minI,mid+1,maxI,maxJ,!cell[4]]);
        }
        else{
            if(maxJ-minJ<2) continue;
            mid=Math.floor(randNumber(minI,maxI)/2)*2;
            horizontal(visitedQueue,src,dst,minJ,maxJ,mid,dict,matrix);
            stack.push([minI,minJ,mid-1,maxJ,!cell[4]]);
            stack.push([mid+1,minJ,maxI,maxJ,!cell[4]]);
        }
    
    }
    return visitedQueue;
}
function randNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1) +min);
}

function horizontal(visitedQueue,src,dst,minJ,maxJ,mid,dict,matrix)
{
    let space=Math.floor(randNumber(minJ,maxJ)/2)*2;
    //let space2=Math.floor(randNumber(minJ,maxJ)/2)*2;
   
    for(let x=minJ;x<=maxJ;x++){
        if(x===space ) continue;
        else addToVisitedQueue(visitedQueue,src,dst,mid,x,dict,matrix);
    }
}
function vertical(visitedQueue,src,dst,minI,maxI,mid,dict,matrix){
    let space=Math.floor(randNumber(minI,maxI)/2)*2;
    //let space2=Math.floor(randNumber(minI,maxI)/2)*2;
    
    for(let x=minI;x<=maxI;x++){
        if(x===space) continue;
        else addToVisitedQueue(visitedQueue,src,dst,x,mid,dict,matrix);
    }
}


function addToVisitedQueue(visitedQueue,src,dst,i,j,dict,matrix)
{
if((i===src.i && j===src.j) || (i===dst.i && j===dst.j)) return;
let key=i+'-'+j;
if(!dict[key]) return;

dict[key].state=OBSTRUCTION;
matrix[i][j].state=OBSTRUCTION;
visitedQueue.push(key);
}




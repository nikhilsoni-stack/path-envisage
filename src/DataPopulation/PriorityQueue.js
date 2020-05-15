
import {QElement} from './QElement'
export class PriorityQueue { 
  
    constructor() 
    { 
        this.items = []; 
    }
add(element, priority) 
{ 
    var qElement = new QElement(element, priority); 
    var contain = false; 
  
    for (var i = 0; i < this.items.length; i++) { 
        if (this.items[i].priority > qElement.priority) { 
            // Once the correct location is found it is 
            // enqueued 
            this.items.splice(i, 0, qElement); 
            contain = true; 
            break; 
        } 
    } 
  
    if (!contain) { 
        this.items.push(qElement); 
    } 
    
}  
remove() 
{ 
    // return the dequeued element 
    // and remove it. 
    // if the queue is empty 
    // returns Underflow 
    if (this.isEmpty()) 
        return "Underflow"; 
    return this.items.shift(); 
}
top() 
{ 
    // returns the highest priority element 
    // in the Priority queue without removing it. 
    if (this.isEmpty()) 
        return "No elements in Queue"; 
    return this.items[0]; 
} 
rear() 
{ 
    // returns the lowest priorty 
    // element of the queue 
    if (this.isEmpty()) 
        return "No elements in Queue"; 
    return this.items[this.items.length - 1]; 
}
isEmpty() 
{ 
    // return true if the queue is empty. 
    return this.items.length === 0; 
}

  
}
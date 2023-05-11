class Node{
    constructor(x,y,dist,prev){
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.prev = null;
    }
}

class game {
    //init game board
    gameBoard(){
        const  board=[];
        for(let i=0;i<8; i++){
            board[i]=[];
            for(let j=0;j<8; j++){
                board[i][j]=[];
            }
        }
        return board;
       
    }
    //check move boundaries
    addMove(x,y){
        if(x>=0 && x <=7 && y>=0 && y <=7){
            return true;
        }else{
            return false;
        }
    }
    //allowed moves for knight
    moveSet(x,y){

        let moves = [
            { x: x + 2, y: y + 1 },
            { x: x + 2, y: y - 1 },
            { x: x - 2, y: y + 1 },
            { x: x - 2, y: y - 1 },
            { x: x + 1, y: y + 2 },
            { x: x - 1, y: y + 2 },
            { x: x - 1, y: y - 2 },
            { x: x + 1, y: y - 2 },
        ];
        return moves;
    }
    knightMove(start,end){
        let x,y;
        //establish queue 
        let q = [];
        q.push(new Node(start[0],start[1],0))
        // establish current position
        let tempq;
        //establish visited boolean
        let visit = this.gameBoard();
        
        visit[start[0]][start[1]] =true;
        while(q.length!=0){
            tempq = q.shift();
            // if checks to match the ending position
            if (tempq.x == end[0] && tempq.y == end[1]){
                const path = [];
                let node = tempq;
                while(node != null){
                    path.unshift([node.x,node.y]);
                    node = node.prev;
                }
                const distance = path.length -1;
                const message = `You made it in ${distance} move's! Here's your path:\n${path.join('\n')}\n`;
                return message;
            }
            // else establishes an iteration over the current position to find the shortest path;
            else{
                const checkMoves = this.moveSet(tempq.x,tempq.y)
                for(let move of checkMoves) {
                    const newNode = new Node(move.x,move.y,tempq.dist+1,true);
                    x= tempq.x +move.x;
                    y= tempq.y +move.y;
                    if(this.addMove(x,y) && visit[x][y]!=null){
                        visit[x][y]=true;
                        newNode.prev = tempq;
                        q.push(newNode);
                    }
                }
            }
        }
        return null;
    }
}


let start = [0,0]
let end = [3,3];

const gameSet= new game();
const board = gameSet.gameBoard();
console.log(gameSet.knightMove(start,end))
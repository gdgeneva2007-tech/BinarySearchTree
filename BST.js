class Node{
    constructor(root,left,right){
        this.root=root; //root here is a number
        this.left=left;
        this.right=right;
    }
}
class Tree{
    constructor(array){
        this.originalArr=array;
        this.root=null; //root here is a node
    }
    initialize(array){
        array.sort((a,b)=>a-b);
        let arr=[];
        if(array.length<=1){
            arr=array;
        }
        else{
            arr.push(array[0]);
            for(let i=1;i<=array.length-1;i++){
                if(array[i]>arr[i-1]){
                    arr.push(array[i]);
                }
            }
        }
        return arr;
    }
    buildTree(array){
        let arr=this.initialize(array);
        this.originalArr=arr;
        let start=0;
        let end=arr.length-1;
        let mid=Math.floor((start+end)/2);
        let arrLeft=arr.slice(0,mid);
        let arrRight=arr.slice(mid+1);
        if(start>end){
            return null;
        }
        let leftRoot=this.buildTree(arrLeft);
        let rightRoot=this.buildTree(arrRight);
        let root=new Node(arr[mid],leftRoot,rightRoot);
        return root;
    }
    includes(value){
        if(this.root===null){
            return false;
        }
        let curRoot=this.root;
        while(curRoot!==null){ //to check
            if(curRoot.root===value){
                return true;               
            }
            if(value>curRoot.root){
                curRoot=curRoot.right;
            }
            else{
                curRoot=curRoot.left;
            }
        }
        return false;
    }
    insert(value){
        let curRoot=this.root;
        let flag;
        let newNode=new Node(value,null,null);
        let prev=null;
        while(curRoot!==null){ //to check
            if(curRoot.root===value){
                return;
            }
            if(value>curRoot.root){
                prev=curRoot;
                curRoot=curRoot.right;
                flag=1;
            }
            else{
                prev=curRoot;
                curRoot=curRoot.left;
                flag=2;
            }
        }
        if(flag===undefined){
            this.root=newNode;
        }
        else if(flag===1){
            prev.right=newNode;
        }
        else if(flag===2){
            prev.left=newNode;
        }
    }
    deleteItem(value){
        if(this.root===null){
            return;
        }
        let curRoot=this.root;
        let flag;
        let prev=null;
        while(curRoot!==null){ //to check
            if(curRoot.root===value){
                if(curRoot.left&&curRoot.right){
                    //delete a node with 2 children
                    let rightSubRoot=curRoot.right;
                    let rightSubPrev=null;
                    while(rightSubRoot.left!==null){
                        rightSubPrev=rightSubRoot;
                        rightSubRoot=rightSubRoot.left;
                    }
                    curRoot.root=rightSubRoot.root;
                    if(rightSubPrev===null){
                        curRoot.right=rightSubRoot.right;
                    }
                    else{
                        rightSubPrev.left=rightSubRoot.right;
                    }
                    return;
                }
                else if(curRoot.left||curRoot.right){
                    //delete a node with 1 child
                    if(flag===undefined){
                        //the root is gonna be deleted and the root only has one child
                        if(curRoot.left){
                            this.root=curRoot.left;
                            return;
                        }
                        if(curRoot.right){
                            this.root=curRoot.right;
                            return;
                        }
                    }
                    if(flag===1){
                        if(curRoot.left){
                            prev.right=curRoot.left;
                            return;
                        }
                        if(curRoot.right){
                            prev.right=curRoot.right;
                            return;
                        }
                    }
                    if(flag===2){
                        if(curRoot.left){
                            prev.left=curRoot.left;
                            return;
                        }
                        if(curRoot.right){
                            prev.left=curRoot.right;
                            return;
                        }
                    }
                }
                else{
                    //delete a node with 0 child
                    if(prev===null){
                        //the tree has only one node(root) and it is gonna be deleted
                        this.root=null;
                        return;
                    }
                    if(flag===1){
                        prev.right=null;
                        return;
                    }
                    if(flag===2){
                        prev.left=null;
                        return;
                    }
                }
            }
            if(value>curRoot.root){
                prev=curRoot;
                curRoot=curRoot.right;
                flag=1;
            }
            else{
                prev=curRoot;
                curRoot=curRoot.left;
                flag=2;
            }
        }
        return;
    }
    depth(value){
        let num=0;  //wait check
        if(this.root===null){
            return undefined;
        }
        let curRoot=this.root;
        let flag;
        while(curRoot!==null){ //to check
            if(curRoot.root===value){
                return num;               
            }
            if(value>curRoot.root){
                curRoot=curRoot.right;
                flag=1;
                num++;
            }
            else{
                curRoot=curRoot.left;
                flag=2;
                num++;
            }
        }
        return undefined;
    }
    raceToBtm(node){
        if(node===null){
            return -1;
        }
        return 1+Math.max(this.raceToBtm(node.left),this.raceToBtm(node.right));
    }
    height(value){
        let flag=0;
        if(this.root===null){
            return undefined;
        }
        let curRoot=this.root;
        while(curRoot!==null){ //to check
            if(curRoot.root===value){
                flag=1;
                break;
            }
            if(value>curRoot.root){
                curRoot=curRoot.right;
            }
            else{
                curRoot=curRoot.left;
            }
        }
        if(flag===1){
            return this.raceToBtm(curRoot);
        }
        return undefined;
    }
    levelOrderForEach(callback){
        if(this.root===null){
            return;
        }
        if(typeof callback!=='function'){
            throw new Error('callback is required!');
        }
        let queue=[this.root];
        while(queue.length!==0){
            let removed=queue.shift();
            callback(removed.root);
            if(removed.left!==null){
                queue.push(removed.left);
            }
            if(removed.right!==null){
                queue.push(removed.right);
            }
        }
    }
    inOrderForEach(callback){
        //left,root,right
        function inOrder(callback,node){
            if(node===null){
                return;
            }
            inOrder(callback,node.left);
            callback(node.root);
            inOrder(callback,node.right);
        }
        inOrder(callback,this.root);
    }
    preOrderForEach(callback){
        //root,left,right
        function preOrder(callback,node){
            if(node===null){
                return;
            }
            callback(node.root);
            preOrder(node.left);
            preOrder(node.right);
        }
        preOrder(callback,this.root);
    }
    postOrderForEach(callback){
        //left,right,root
        function postOrder(callback,node){
            if(node===null){
                return;
            }
            postOrder(node.left);
            postOrder(node.right);
            callback(node.root);
        }
        postOrder(callback,this.root);
    }
    isBalanced(node=this.root){
        if(node===null){
            return true; 
        }
        let leftHeight=this.raceToBtm(node.left);
        let rightHeight=this.raceToBtm(node.right);
        if((leftHeight-rightHeight)>=-1 && (leftHeight-rightHeight)<=1 && this.isBalanced(node.left) && this.isBalanced(node.right)){
            return true;
        }
        return false;
    }
    rebalance(){
        if(!this.isBalanced()){
            let arr=[];
            this.preOrderForEach((value)=>{
                arr.push(value);
            });
            this.originalArr=arr;
            this.root=this.buildTree(arr);
        }
    }    
}
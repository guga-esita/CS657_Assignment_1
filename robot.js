class Robot {
    matrixWidth = null;
    matrixHeight = null;
    matrix = null;
    obstacleRatio = null;
    constructor(matrixWidth, matrixHeight, obstacleRatio){
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        this.obstacleRatio = obstacleRatio;
        // matrix initialization with desired dimensions and initial values
        this.matrix = Array(matrixHeight).fill(null).map(() => Array(matrixWidth).fill(2)); 
        console.table(this.matrix);
        this.generateObstacles();
        console.table(this.matrix);
    }

    generateObstacles(){
        // for (let i = 0; i < this.matrix.length; i++) {
        //     for (let j = 0; j < this.matrix[i].length; j++) {
        //        if(this.matrix[i][j] == 2) {
        //         this.matrix[i][j] = 1;
        //        }
        //     }
        // }
        var arr = [];
        for(let i = 0; i < 2; i++){
            arr.push(this.generateRandomNumber(10, 10))
        }
        console.log(arr)
        for(let i,j = 0; i < arr.length; i++, j++){
            this.matrix[i][j] = 1
            console.log(3)
        }
        console.table(this.matrix)
    }


    generateRandomNumber(maxWidth, maxHeight){
        const randomWidth = Math.floor(Math.random() * (maxWidth + 1) + 0)
        const randomHeight= Math.floor(Math.random() * (maxHeight + 1) + 0)
        // console.log(randomNumber1)
        // console.log(randomNumber2)
        return [randomWidth, randomHeight];
    }
    out() {
        console.table(this.matrix);
    }
}

const myRobot = new Robot(10, 10, 1);
array = myRobot.generateRandomNumber(40, 32);


/* 
generate random numbers from wherever brackets we want
iiterate to the number of random numbers we have
    generate 2 random numbers between width and height of array
    check if they are in the array
    save that to array
    place obstacle in the matrix

*/
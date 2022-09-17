class Robot {
    matrixWidth = null;
    matrixHeight = null;
    matrix = null;
    robotMap = null;
    obstaclePercentage = null;
    constructor(matrixWidth, matrixHeight, obstaclePercentage){
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        this.obstaclePercentage = obstaclePercentage;
        /* matrix initialization with desired dimensions and initial values */
        this.matrix = Array(matrixHeight).fill(null).map(() => Array(matrixWidth).fill(2)); 
        this.generateObstacles(obstaclePercentage);
        this.matrix[9][9] = 'D' /* initializing destination */
        this.robotMap = this.matrix;
        console.table(this.matrix)
        this.robotMap[7][4] = "S" /* initializing robot */
        console.table(this.robotMap)
    }

    generateObstacles(obstaclePercentage){
        var arr = [];
        var numOfObstacles = Math.floor(this.matrixWidth * this.matrixHeight * obstaclePercentage / 100);
        console.log("number of obstacles -->", numOfObstacles)
        for(let i = 0; i < numOfObstacles; i++){
            arr.push(this.generateRandomNumber(this.matrixWidth, this.matrixHeight));
        }
        for(let i = 0, j = 0; i < arr.length; i++, j = 0){
            this.matrix[arr[i][j]][arr[i][j+1]] = 0
        }
    }

    repeatedLocations = [[7, 5], [9, 9]]
    generateRandomNumber(maxWidth, maxHeight){
        
        const xRand = Math.floor(Math.random() * (maxWidth) + 0)
        const yRand = Math.floor(Math.random() * (maxHeight) + 0)
        for(let i = 0; i < this.repeatedLocations.length; i++){
            const robotCoord = this.repeatedLocations[i]
            const [x, y] = robotCoord
            if (x == xRand && y == yRand) {
                console.log("REPEATED REPEATED REPEATED REPEATED REPEATED ");
                return this.generateRandomNumber(this.matrixWidth, this.matrixHeight);
            }
        }
        this.repeatedLocations.push([xRand, yRand]);
        return [xRand, yRand];
    }
    out() {
        console.table(this.matrix);
    }
}

const myRobot = new Robot(10, 10, 10);

array = myRobot.generateRandomNumber(40);
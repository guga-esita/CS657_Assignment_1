class Robot {
    matrixWidth = null;
    matrixHeight = null;
    matrix = null;
    constructor(matrixWidth, matrixHeight){
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        // matrix initialization with desired dimensions and initial values
        this.matrix = Array(matrixHeight).fill(null).map(() => Array(matrixWidth).fill(0)); 
    }

    out() {
        console.log(this.matrixHeight, this.matrixHeight);
        console.table(this.matrix);
    }
}

const myRobot = new Robot(2, 3);
myRobot.out();
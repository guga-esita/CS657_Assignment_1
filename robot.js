class Robot {
    matrixWidth = null;
    matrixHeight = null;
    matrix = null;
    robotMap = null;
    obstaclePercentage = null;
    repeatedLocations = [[7, 4], [9, 9]];
    robotOrientation = 315;

    constructor(matrixWidth, matrixHeight, obstaclePercentage){
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        this.obstaclePercentage = obstaclePercentage;
        /* matrix initialization with desired dimensions and initial values */
        this.matrix = Array(matrixHeight).fill(null).map(() => Array(matrixWidth).fill(1)); 
        this.matrix[9][9] = 'D' /* initializing destination */
        //this.robotMap = this.matrix.map(a => a.slice())
        this.robotMap = Array(matrixHeight).fill(null).map(() => Array(matrixWidth).fill(2)); 
        this.robotMap[9][9] = 'D' /* initializing destination */
        this.generateObstacles(obstaclePercentage);
        this.robotMap[7][4] = "S" /* initializing robot */
        console.table(this.matrix);
        // console.table(this.robotMap);
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
    getRobotLocation(){
        for(var i = 0; i < this.robotMap.length; i++) {
            for(var j = 0; j < this.robotMap[i].length; j++) {
                if(this.robotMap[i][j] == 'S'){
                    return [i, j];
                }
            }
        }
    }

    isThereObstacle(x, y){
        if(this.matrix[x][y] == 0) {
            return true;
        }
        return false;
    }

    useSonar() {
        var view = this.getRobotLocation();
        var view1 = this.getRobotLocation();
        var view2= this.getRobotLocation();
        /* variable to getting robot's current 
        location and then checking different ones */

        switch(this.robotOrientation){
            case 0:
                /* check for 0 direction */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] > 0) {
                    // console.log(view[0]) 
                    if(this.matrix[view[0] - 1][view[1]] == 0){
                        console.log("OBSTACLE ON '0'-->", [view[0] - 1], [view[1]])
                        this.robotMap[view[0] - 1][view[1]] = 0;
                    }
                    else {
                        this.robotMap[view[0] - 1][view[1]] = 1;
                    }
                    view[0] = view[0] - 1;
                }
                /* checking for 315 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] > 0 && view1[1] > 0) {
                    // console.log(view1[0]) 
                    if(this.matrix[view1[0] - 1][view1[1] - 1] == 0){
                        console.log("OBSTACLE ON '315'-->", [view1[0] - 1], [view1[1] - 1])
                        this.robotMap[view1[0] - 1][view1[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0] - 1][view1[1] - 1] = 1;
                    }
                    view1[0] = view1[0] - 1;
                    view1[1] = view1[1] - 1;
                }
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
                        console.log("OBSTACLE ON '45'-->", [view2[0] - 1], [view2[1] + 1])
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] + 1;
                }
                /* have to implement sonar system, currently issue with while loop running before seeing obstacle
                one possible solution is to check extra block on each iteration, like check robot[0] - 1 if going north
                that way we can detect obstacle before we hit it */
                break;
            case 45:
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
                        console.log("OBSTACLE ON '45'-->", [view2[0] - 1], [view2[1] + 1])
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] + 1;
                }
                /* check for 0 direction */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] > 0) {
                    // console.log(view[0]) 
                    if(this.matrix[view[0] - 1][view[1]] == 0){
                        console.log("OBSTACLE ON '0'-->", [view[0] - 1], [view[1]])
                        this.robotMap[view[0] - 1][view[1]] = 0;
                    }
                    else {
                        this.robotMap[view[0] - 1][view[1]] = 1;
                    }
                    view[0] = view[0] - 1;
                }
                /* checking for 90 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
                        console.log("OBSTACLE ON '90'-->", [view1[0]], [view1[1] + 1])
                        this.robotMap[view1[0]][view1[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0]][view1[1] + 1] = 1;
                    }
                    view1[1] = view1[1] + 1;
                }
                break;
            case 90:
                /* checking for 90 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
                        console.log("OBSTACLE ON '90'-->", [view1[0]], [view1[1] + 1])
                        this.robotMap[view1[0]][view1[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0]][view1[1] + 1] = 1;
                    }
                    view1[1] = view1[1] + 1;
                }
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
                        console.log("OBSTACLE ON '45'-->", [view2[0] - 1], [view2[1] + 1])
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] + 1;
                }
                /* checking for 135 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight - 1 && view[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
                        console.log("OBSTACLE ON '135'-->", [view[0] + 1], [view[1] + 1])
                        this.robotMap[view[0] + 1][view[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view[0] + 1][view[1] + 1] = 1;
                    }
                    view[0] = view[0] + 1;
                    view[1] = view[1] + 1;
                }
                break;
            case 135:
                /* checking for 135 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight - 1 && view[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
                        console.log("OBSTACLE ON '135'-->", [view[0] + 1], [view[1] + 1])
                        this.robotMap[view[0] + 1][view[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view[0] + 1][view[1] + 1] = 1;
                    }
                    view[0] = view[0] + 1;
                    view[1] = view[1] + 1;
                }
                /* checking for 90 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
                        console.log("OBSTACLE ON '90'-->", [view1[0]], [view1[1] + 1])
                        this.robotMap[view1[0]][view1[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0]][view1[1] + 1] = 1;
                    }
                    view1[1] = view1[1] + 1;
                }
                 /* checking for 180 degree */
                 while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
                        console.log("OBSTACLE ON '180'-->", [view2[0] + 1], [view2[1]])
                        this.robotMap[view2[0] + 1][view2[1]] = 0;
                    }
                    else {
                        this.robotMap[view2[0] + 1][view2[1]] = 1;
                    }
                    view2[0] = view2[0] + 1;
                }
                break;
            case 180:
                 /* checking for 180 degree */
                 while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
                        console.log("OBSTACLE ON '180'-->", [view2[0] + 1], [view2[1]])
                        this.robotMap[view2[0] + 1][view2[1]] = 0;
                    }
                    else {
                        this.robotMap[view2[0] + 1][view2[1]] = 1;
                    }
                    view2[0] = view2[0] + 1;
                }
                /* checking for 135 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight - 1 && view[1] < this.matrixWidth - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
                        console.log("OBSTACLE ON '135'-->", [view[0] + 1], [view[1] + 1])
                        this.robotMap[view[0] + 1][view[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view[0] + 1][view[1] + 1] = 1;
                    }
                    view[0] = view[0] + 1;
                    view[1] = view[1] + 1;
                }
               /* checking for 225 degree */
               while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight - 1 && view1[1] > 0) {
                // console.log(view2[0]) 
                if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
                    console.log("OBSTACLE ON '225'-->", [view1[0] + 1], [view1[1] - 1])
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 0;
                }
                else {
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 1;
                }
                view1[0] = view1[0] + 1;
                view1[1] = view1[1] - 1;
            }
                break;
            case 225:
                /* checking for 225 degree */
               while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight - 1 && view1[1] > 0) {
                // console.log(view2[0]) 
                if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
                    console.log("OBSTACLE ON '225'-->", [view1[0] + 1], [view1[1] - 1])
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 0;
                }
                else {
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 1;
                }
                view1[0] = view1[0] + 1;
                view1[1] = view1[1] - 1;
                }
                /* checking for 180 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight - 1) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
                        console.log("OBSTACLE ON '180'-->", [view2[0] + 1], [view2[1]])
                        this.robotMap[view2[0] + 1][view2[1]] = 0;
                    }
                    else {
                        this.robotMap[view2[0] + 1][view2[1]] = 1;
                    }
                    view2[0] = view2[0] + 1;
                }
                /* checking for 270 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0]][view[1] - 1] == 0){
                        console.log("OBSTACLE ON '270'-->", [view[0]], [view[1] - 1])
                        this.robotMap[view[0]][view[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view[0]][view[1] - 1] = 1;
                    }
                    view[1] = view[1] - 1;
                }
                break;
            case 270:
                /* checking for 270 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0]][view[1] - 1] == 0){
                        console.log("OBSTACLE ON '270'-->", [view[0]], [view[1] - 1])
                        this.robotMap[view[0]][view[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view[0]][view[1] - 1] = 1;
                    }
                    view[1] = view[1] - 1;
                }
                 /* checking for 225 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight - 1 && view1[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
                        console.log("OBSTACLE ON '225'-->", [view1[0] + 1], [view1[1] - 1])
                        this.robotMap[view1[0] + 1][view1[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0] + 1][view1[1] - 1] = 1;
                    }
                    view1[0] = view1[0] + 1;
                    view1[1] = view1[1] - 1;
                }
                 /* checking for 315 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] - 1][view2[1] - 1] == 0){
                        console.log("OBSTACLE ON '315'-->", [view2[0] - 1], [view2[1] - 1])
                        this.robotMap[view2[0] - 1][view2[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] - 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] - 1;
                }
                break;
            case 315:
                /* checking for 315 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view2[0] - 1][view2[1] - 1] == 0){
                        console.log("OBSTACLE ON '315'-->", [view2[0] - 1], [view2[1] - 1])
                        this.robotMap[view2[0] - 1][view2[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] - 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] - 1;
                }
                /* checking for 270 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[1] > 0) {
                    // console.log(view2[0]) 
                    if(this.matrix[view[0]][view[1] - 1] == 0){
                        console.log("OBSTACLE ON '270'-->", [view[0]], [view[1] - 1])
                        this.robotMap[view[0]][view[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view[0]][view[1] - 1] = 1;
                    }
                    view[1] = view[1] - 1;
                }
                /* check for 0 direction */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] > 0) {
                    // console.log(view[0]) 
                    if(this.matrix[view1[0] - 1][view1[1]] == 0){
                        console.log("OBSTACLE ON '0'-->", [view1[0] - 1], [view1[1]])
                        this.robotMap[view1[0] - 1][view1[1]] = 0;
                    }
                    else {
                        this.robotMap[view1[0] - 1][view1[1]] = 1;
                    }
                    view1[0] = view1[0] - 1;
                }
                break;
        }
    }

    goForward(){
        var robotLocation = this.getRobotLocation()
        this.robotMap[robotLocation[0]][robotLocation[1]] = 1;

        switch(this.robotOrientation){
            case 0:
                this.robotMap[robotLocation[0] - 1][robotLocation[1]] = 'S';
                break;
            case 45:
                this.robotMap[robotLocation[0] - 1][robotLocation[1] + 1] = 'S';
                break;
            case 90:
                this.robotMap[robotLocation[0]][robotLocation[1] + 1] = 'S';
                break;
            case 135:
                this.robotMap[robotLocation[0] + 1][robotLocation[1] + 1] = 'S';
                break;
            case 180:
                this.robotMap[robotLocation[0] + 1][robotLocation[1]] = 'S';
                break;
            case 225:
                this.robotMap[robotLocation[0] + 1][robotLocation[1] -1] = 'S';
                break;
            case 270:
                this.robotMap[robotLocation[0]][robotLocation[1] - 1] = 'S';
                break;
            case 315:
                this.robotMap[robotLocation[0] - 1][robotLocation[1] - 1] = 'S';
                break;
        }
        console.table(this.robotMap);
    }

    start() {
        this.useSonar()
        console.table(this.robotMap);
    }
    out() {
        // console.table(this.matrix);
    }
}

const myRobot = new Robot(10, 10, 10);
myRobot.start()
class Robot {
    /* initializing Robot class internal variables */
    /* for entering width and height of our matrix */
    matrixWidth = null;
    matrixHeight = null;
    /* matrix 2d array that has all the information 
    about environment*/
    matrix = null;
    /* robots matrix, that updates as robot learns
    about environnment */
    robotMap = null;
    obstaclePercentage = null;
    destinationLocation = [41, 31]
    /* we are required to have robot initially at 7, 4 location
    however becasue I have 0 padding on borders, for our matrix
    it will be +1, so 8, 6. same goes for destination*/
    repeatedLocations = [[8, 6], [1, 1]];
    /* robot orientation used to determine robots
    orientation in a world */
    robotOrientation = 0;
    moveCount = 0; /* count how many moves it takes */
    destinationReached = false; /* flag to know if we reached our goal */

    constructor(matrixWidth, matrixHeight, obstaclePercentage){
        /* initializing our local matrix dimensions and obstacle percentage 
        with user's entered values */
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        this.obstaclePercentage = obstaclePercentage;
        /* creating 2d array, with desired dimension and obstacles as borders 
        on all four edges */
        this.matrix = Array(matrixHeight).fill(null).map(() => {
            const array=Array(matrixWidth).fill(1)
            array.push(0)
            array.unshift(0)
            return array
        }); 
        this.matrix.unshift(Array(matrixWidth + 2).fill(0))
        this.matrix.push(Array(matrixWidth + 2).fill(0))
        this.matrix[this.destinationLocation[0]][this.destinationLocation[1]] = 'D' /* initializing destination */
        /* doiing the same, creating 2d array and creating borders out of obstacles for robots matrix */
        this.robotMap = Array(matrixHeight).fill(null).map(() => {
            const array=Array(matrixWidth).fill(2)
            array.push(0)
            array.unshift(0)
            return array
        }); 
        this.robotMap.unshift(Array(matrixWidth + 2).fill(0))
        this.robotMap.push(Array(matrixWidth + 2).fill(0))
        this.robotMap[this.destinationLocation[0]][this.destinationLocation[1]] = 'D' /* initializing destination */
        this.generateObstacles(obstaclePercentage);
        this.robotMap[7][4] = "S" /* initializing robot */
        console.table(this.matrix);
        console.table(this.robotMap);
        /* print world and robots perceived world as soon as object is created, for GUI purposes */
    }

    generateObstacles(obstaclePercentage){
        var arr = [];
        /* calculating number of obstacles depending on the matrix width and height */
        var numOfObstacles = Math.floor(this.matrixWidth * this.matrixHeight * obstaclePercentage / 100);
        /* on each call of this function, for number of obstacles calling a random number generator
        function between matrix range and pushin it to the array */
        for(let i = 0; i < numOfObstacles; i++){
            arr.push(this.generateRandomNumber(this.matrixWidth, this.matrixHeight));
        }
        /* put 0's or obstacles in random number couples. E.X (4, 5) location */
        for(let i = 0, j = 0; i < arr.length; i++, j = 0){
            this.matrix[arr[i][j]][arr[i][j+1]] = 0
        }
    }

    generateRandomNumber(maxWidth, maxHeight){
        /* creating two local variables inbetween matrix's max dimensions */
        const xRand = Math.floor(Math.random() * (maxWidth) + 0)
        const yRand = Math.floor(Math.random() * (maxHeight) + 0)
        /* for loop is used to avoid duplicates. we have array in class that keeps locations
        of matrix locatinos to avoid, such as robot and destination locations. 
        every time we generate a random number couple, we compare it to every element
        in that array, if there is an exact match, generate a new couple by recursively calling
        this function, and if it is unique, save it to that array as well */
        for(let i = 0; i < this.repeatedLocations.length; i++){
            const robotCoord = this.repeatedLocations[i]
            const [x, y] = robotCoord
            if (x == xRand && y == yRand) {
                return this.generateRandomNumber(this.matrixWidth, this.matrixHeight);
            }
        }
        this.repeatedLocations.push([xRand, yRand]);
        return [xRand, yRand];
    }

    getRobotLocation(){
        /* method used for getting robot's location, wherever it might be on matrix */
        for(var i = 0; i < this.robotMap.length; i++) {
            for(var j = 0; j < this.robotMap[i].length; j++) {
                /* scanning entire array and when finding 'S' - Robot, return its location */
                if(this.robotMap[i][j] == 'S'){
                    return [i, j];
                }
            }
        }
    }

    useSonar() {
        /* three variables to keep track of loooking in 3 directions 
        on each orientation of our robot */
        var view = this.getRobotLocation();
        var view1 = this.getRobotLocation();
        var view2= this.getRobotLocation();
        /* variable to getting robot's current 
        location and then checking different ones */

        switch(this.robotOrientation){
            /* this switch statemet covers all the possible cases that robot might be oriented
            int our matrix world */
            case 0:
                /* these lines of code are responsible for checking three directons at a time
                E.X. if robot is looking up, or 0 direciton, we are checking for 315 (0 - 45) and
                for 45(0 + 45) degrees as well as it was required to check adjacent 45 degrees
                when using sonar*/
                /* check for 0 direction */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] > 0) {
                    if(this.matrix[view[0] - 1][view[1]] == 0){
                        this.robotMap[view[0] - 1][view[1]] = 0;
                    }
                    else {
                        this.robotMap[view[0] - 1][view[1]] = 1;
                    }
                    view[0] = view[0] - 1;
                }
                /* checking for 315 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] > 0 && view1[1] > 0) {
                    /* checking for individual locations in matrix, depending on where we
                    are checking, iterating differently */
                    if(this.matrix[view1[0] - 1][view1[1] - 1] == 0){
                        this.robotMap[view1[0] - 1][view1[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0] - 1][view1[1] - 1] = 1;
                    }
                    view1[0] = view1[0] - 1;
                    view1[1] = view1[1] - 1;
                }
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth + 2) {
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] + 1;
                }
                break;
            case 45:
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth + 2) {
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
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
                    if(this.matrix[view[0] - 1][view[1]] == 0){
                        this.robotMap[view[0] - 1][view[1]] = 0;
                    }
                    else {
                        this.robotMap[view[0] - 1][view[1]] = 1;
                    }
                    view[0] = view[0] - 1;
                }
                /* checking for 90 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth + 2) {
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
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
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth + 2) {
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
                        this.robotMap[view1[0]][view1[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0]][view1[1] + 1] = 1;
                    }
                    view1[1] = view1[1] + 1;
                }
                /* checking for 45 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] > 0 && view2[1] < this.matrixWidth + 2) {
                    if(this.matrix[view2[0] - 1][view2[1] + 1] == 0){
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view2[0] - 1][view2[1] + 1] = 1;
                    }
                    view2[0] = view2[0] - 1;
                    view2[1] = view2[1] + 1;
                }
                /* checking for 135 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight + 2 && view[1] < this.matrixWidth + 2) {
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
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
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight + 2 && view[1] < this.matrixWidth + 2) {
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
                        this.robotMap[view[0] + 1][view[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view[0] + 1][view[1] + 1] = 1;
                    }
                    view[0] = view[0] + 1;
                    view[1] = view[1] + 1;
                }
                /* checking for 90 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[1] < this.matrixWidth  + 2) { 
                    if(this.matrix[view1[0]][view1[1] + 1] == 0){
                        this.robotMap[view1[0]][view1[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view1[0]][view1[1] + 1] = 1;
                    }
                    view1[1] = view1[1] + 1;
                }
                 /* checking for 180 degree */
                 while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight  + 2) {
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
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
                 while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight + 2) {
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
                        this.robotMap[view2[0] + 1][view2[1]] = 0;
                    }
                    else {
                        this.robotMap[view2[0] + 1][view2[1]] = 1;
                    }
                    view2[0] = view2[0] + 1;
                }
                /* checking for 135 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[0] < this.matrixHeight + 2 && view[1] < this.matrixWidth + 2) {
                    if(this.matrix[view[0] + 1][view[1] + 1] == 0){
                        this.robotMap[view[0] + 1][view[1] + 1] = 0;
                    }
                    else {
                        this.robotMap[view[0] + 1][view[1] + 1] = 1;
                    }
                    view[0] = view[0] + 1;
                    view[1] = view[1] + 1;
                }
               /* checking for 225 degree */
               while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight + 2 && view1[1] > 0) {
                if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
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
               while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight + 2 && view1[1] > 0) {
                if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 0;
                }
                else {
                    this.robotMap[view1[0] + 1][view1[1] - 1] = 1;
                }
                view1[0] = view1[0] + 1;
                view1[1] = view1[1] - 1;
                }
                /* checking for 180 degree */
                while(this.matrix[view2[0]][view2[1]] != 0 && view2[0] < this.matrixHeight + 2) {
                    if(this.matrix[view2[0] + 1][view2[1]] == 0){
                        this.robotMap[view2[0] + 1][view2[1]] = 0;
                    }
                    else {
                        this.robotMap[view2[0] + 1][view2[1]] = 1;
                    }
                    view2[0] = view2[0] + 1;
                }
                /* checking for 270 degree */
                while(this.matrix[view[0]][view[1]] != 0 && view[1] > 0) {
                    if(this.matrix[view[0]][view[1] - 1] == 0){
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
                    if(this.matrix[view[0]][view[1] - 1] == 0){
                        this.robotMap[view[0]][view[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view[0]][view[1] - 1] = 1;
                    }
                    view[1] = view[1] - 1;
                }
                 /* checking for 225 degree */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] < this.matrixHeight + 2 && view1[1] > 0) {
                    if(this.matrix[view1[0] + 1][view1[1] - 1] == 0){
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
                    if(this.matrix[view2[0] - 1][view2[1] - 1] == 0){
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
                    if(this.matrix[view2[0] - 1][view2[1] - 1] == 0){
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
                    if(this.matrix[view[0]][view[1] - 1] == 0){
                        this.robotMap[view[0]][view[1] - 1] = 0;
                    }
                    else {
                        this.robotMap[view[0]][view[1] - 1] = 1;
                    }
                    view[1] = view[1] - 1;
                }
                /* check for 0 direction */
                while(this.matrix[view1[0]][view1[1]] != 0 && view1[0] > 0) {
                    if(this.matrix[view1[0] - 1][view1[1]] == 0){
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
        /* function for moving forward depending on where the robot is looking
        "forward" might be different thing, so we are using case statement to handle
        all the cases */
        this.moveCount = this.moveCount + 1; /* increment move count */
        var robotLocation = this.getRobotLocation() /* get robot's current location */
        /* fill robot's current location with 1, because there obviously is a road and not an obstacle */
        this.robotMap[robotLocation[0]][robotLocation[1]] = 1; 
        switch(this.robotOrientation){
            case 0:
                /* if we are going up, enter robots identifier 'S' in upper location  */
                this.robotMap[robotLocation[0] - 1][robotLocation[1]] = 'S';
                this.useSonar();
                break;
            case 45:
                /* if we are going up and right, enter 'S' in that location, an so on, f
                or all the cases */
                this.robotMap[robotLocation[0] - 1][robotLocation[1] + 1] = 'S';
                /* use sonar to scan the environment on each movement */
                this.useSonar();
                break;
            case 90:
                this.robotMap[robotLocation[0]][robotLocation[1] + 1] = 'S';
                this.useSonar();
                break;
            case 135:
                this.robotMap[robotLocation[0] + 1][robotLocation[1] + 1] = 'S';
                this.useSonar();
                break;
            case 180:
                this.robotMap[robotLocation[0] + 1][robotLocation[1]] = 'S';
                this.useSonar();
                break;
            case 225:
                this.robotMap[robotLocation[0] + 1][robotLocation[1] -1] = 'S';
                this.useSonar();
                break;
            case 270:
                this.robotMap[robotLocation[0]][robotLocation[1] - 1] = 'S';
                this.useSonar();
                break;
            case 315:
                this.robotMap[robotLocation[0] - 1][robotLocation[1] - 1] = 'S';
                this.useSonar();
                break;
        }
        this.useSonar();
    }

    rotateRight(){
        /* this method is for rotatin right, it takes robots current orientation, and changes it to + 45 */
        this.moveCount = this.moveCount + 1; /* increment move count */
        switch(this.robotOrientation){
            case 0:
                this.robotOrientation = 45;
                /* use sonar to scan the environment */
                this.useSonar();
                break;
            case 45:
                this.robotOrientation = 90;
                this.useSonar();
                break;
            case 90:
                this.robotOrientation = 135;
                this.useSonar();
                break;
            case 135: 
                this.robotOrientation = 180;
                this.useSonar();
                break;
            case 180:
                this.robotOrientation = 225;
                this.useSonar();
                break;
            case 225:
                this.robotOrientation = 270;
                this.useSonar();
                break;
            case 270:
                this.robotOrientation = 315;
                this.useSonar();
                break;
            case 315:
                this.robotOrientation = 0;
                this.useSonar();
                break;
        }
        this.useSonar();
    }

    rotateLeft(){
        /* this method is for rotatin left, it takes robots current orientation, and changes it to - 45 */
        this.moveCount = this.moveCount + 1; /* increment move count */
        switch(this.robotOrientation){
            case 0:
                this.robotOrientation = 315;
                /* use soonar to scan the environment */
                this.useSonar();
                break;
            case 45:
                this.robotOrientation = 0;
                this.useSonar();
                break;
            case 90:
                this.robotOrientation = 45;
                this.useSonar();
                break;
            case 135: 
                this.robotOrientation = 90;
                this.useSonar();
                break;
            case 180:
                this.robotOrientation = 135;
                this.useSonar();
                break;
            case 225:
                this.robotOrientation = 180;
                this.useSonar();
                break;
            case 270:
                this.robotOrientation = 225;
                this.useSonar();
                break;
            case 315:
                this.robotOrientation = 270;
                this.useSonar();
                break;
        }
        this.useSonar();
    }

    isThereAWay(){
        /* this method is used for determining if there is a way in front of our robot in the 
        world, or is there an obstacle or out of range of matrix */
        var robot = this.getRobotLocation(); /* get robots orientation */
        switch(this.robotOrientation){
            case 0:
                /* there is an obstacle */
                if(this.robotMap[robot[0] - 1][robot[1]] == 1) { 
                    /* if there is 1 in the location, it means there is 
                    a road, and return true */
                    return true;
                } 
                /* otherwise its either obstacle, or matrix out of range
                nontheless, return false because there is no way */
                return false;
                break;
            case 45:
                if(this.robotMap[robot[0] - 1][robot[1] + 1] == 1) {
                    return true;
                } 
                return false;
                break;
            case 90:
                if(this.robotMap[robot[0]][robot[1] + 1] == 1) {
                    return true;
                } 
                return false;
                break;
            case 135: 
                if(this.robotMap[robot[0] + 1][robot[1] + 1] == 1) {
                    return true;
                } 
                return false;
                break;
            case 180:
                if(this.robotMap[robot[0] + 1][robot[1]] == 1) {
                    return true;
                } 
                return false;
                break;
            case 225:
                if(this.robotMap[robot[0] + 1][robot[1] - 1] == 1) {
                    return true;
                } 
                return false;
                break;
            case 270:
                if(this.robotMap[robot[0]][robot[1] - 1] == 1) {
                    return true;
                } 
                return false;
                break;
            case 315:
                if(this.robotMap[robot[0] - 1][robot[1] - 1] == 1) {
                    return true;
                } 
                return false;
                break;
        }
    }

    destinationOriaentation(){
        /* method for determining destination's orientation depending
        on robots orientation in the world */
        var robot = this.getRobotLocation();
        var destination = this.destinationLocation;
        if(destination[[0]] < robot[0] && destination[1] > robot[1]) {
            //up and right
            return 45;
        }
        else if(destination[[0]] < robot[0] && destination[1] < robot[1]) {
            // up and left
            return 315;
        }
        else if(destination[[0]] > robot[0] && destination[1] > robot[1]) {
            // down and right
            return 135;
        }
        else if(destination[[0]] > robot[0] && destination[1] < robot[1]) {
            //down and left
            return 225;
        }
        else if(destination[[0]] == robot[0] && destination[1] > robot[1]) {
            //directly right
            return 90;
        }
        else if(destination[[0]] == robot[0] && destination[1] < robot[1]) {
            //directly left
            return 270;
        }
        else if(destination[[0]] < robot[0] && destination[1] == robot[1]) {
            //directly up
            return 0;
        }
        else if(destination[[0]] > robot[0] && destination[1] == robot[1]) {
            //directly down
            return 180;
        }
    }
    
    steerTowardsDestination(){
        /* method for steering towards destination.
        we compare robots and destinations orientations and depending 
        on that, we either turn left or turn right and recursively call
        this function, untill we are oriented towards destination */
        if(this.robotOrientation > this.destinationOriaentation()){
            this.rotateLeft();
            this.steerTowardsDestination();
        }
        else if(this.robotOrientation < this.destinationOriaentation()){
            this.rotateRight();
            this.steerTowardsDestination();
        }
        else if(this.robotOrientation == this.destinationOriaentation()){
            return;
        }
    }

    start() {
        /* main driver function for robot to go
        to the destination */
        this.steerTowardsDestination(); /* when initializing steer towards destinatino */
        for(let i = 0; i < 100; i ++){
            /* loop to go through expert based rules. if it takes more than 500 cycles, 
            path to destination probably doesn't exist, or our robot is not 
            smart enough to figure out a way to destination */
            if(JSON.stringify(this.getRobotLocation()) === JSON.stringify(this.destinationLocation)){
                /* comparing robots locatin and destinations location, if 
                they are same, we have reached destination, so print user friendly
                text, our GUI and return to stop computing */
                this.destinationReached = true;
                console.log("destination reached");
                console.log("move count is -> ", this.moveCount)
                console.table(this.robotMap)
                return;
            }
            this.useSonar(); /* before moving, scan the environment */
            if(this.isThereAWay() == true){
                /* if robot can see a way, move forward and scan the environment */
                this.goForward();
                this.steerTowardsDestination();
            }
            if(this.isThereAWay() == false){
                this.rotateLeft();
            }
            /* otherwise try turning left or turning right */
            if(this.isThereAWay() == false){
                this.rotateRight();
                this.rotateRight();
            }
            this.useSonar();
            console.table(this.robotMap)
        }
        console.log("move count is -> ", this.moveCount)
        /* if the robot didn't reach the destination, 
        print move count robot matrix*/
        console.table(this.robotMap)
    }
}

/* creating objects with 42 by 32 matrix, with 10 20 and 45 % obstacles respectively. */
const myRobot1 = new Robot(37, 47, 10);
const myRobot2 = new Robot(37, 47, 20);
const myRobot3 = new Robot(37, 47, 45);
myRobot1.start();
myRobot2.start();
myRobot3.start();
console.log("move count for 10% obstacles", myRobot1.moveCount)
console.log("move count for 20% obstacles", myRobot2.moveCount)
console.log("move count for 45% obstacles", myRobot3.moveCount)

console.log("success for 10 % obstacles", myRobot1.destinationReached)
console.log("success for 20 % obstacles", myRobot2.destinationReached)
console.log("success for 45 % obstacles", myRobot3.destinationReached)

console.log("robot's matrix for 10%")
console.table(myRobot1.robotMap)
console.log("robot's matrix for 20%")
console.table(myRobot2.robotMap)
console.log("robot's matrix for 45%")
console.table(myRobot3.robotMap)
table = console.table(myRobot1.robotMap);
const fs = require('fs')
  
fs.writeFile('Output.txt', "move count for 10% obstacles  " + myRobot1.moveCount.toString() + "\n", (err) => {
    if (err) throw err;
})
fs.appendFile('Output.txt', "move count for 20% obstacles  " + myRobot2.moveCount.toString() + "\n", (err) => {
    if (err) throw err;
})
fs.appendFile('Output.txt', "move count for 45% obstacles  " + myRobot3.moveCount.toString() + "\n", (err) => {
    if (err) throw err;
})

fs.appendFile('Output.txt', "success for 10 % obstacles  " + myRobot1.destinationReached.toString() + "\n", (err) => {
    if (err) throw err;
})
fs.appendFile('Output.txt', "success for 20 % obstacles  " + myRobot2.destinationReached.toString() + "\n", (err) => {
    if (err) throw err;
})
fs.appendFile('Output.txt', "success for 45 % obstacles  " + myRobot3.destinationReached.toString() + "\n", (err) => {
    if (err) throw err;
})

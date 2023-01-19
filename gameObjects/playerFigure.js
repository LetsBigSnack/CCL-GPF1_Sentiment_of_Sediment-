
class PlayerFigure extends ImageObject {


    moveBy = {
	    "left": 0,
	    "top": 0
    };

    moveVelocity = 3;
    startJump = false;
    punch = "";
    bomb = false;
    punchCooldown = true;

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        console.log("PlayerFigure has been created");

        this.mass = .6;
    }

    update() {
        this.position.x += this.moveBy.left;
        this.position.y += this.moveBy.top;
        if(this.punch){
            this.spawnPunch(this.punch);
        }
        if(this.bomb){
            this.spawnBomb();
        }
        this.checkWorldPostion();
        console.log(this.punchCooldown);
    }
    
    checkWorldPostion() {
        if (this.boundaries.getBottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom;
        }
        else if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.height;
        }
        else if (this.boundaries.getRightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right;
        }
        else if (this.boundaries.getLeftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.width;
        }
    }

    //TODO write CLEAN delete Object afterwards
    //TODO take offset into consideration
    //TODO add Attributes to the Punch
    spawnPunch(punch){
        if(this.punchCooldown){
            this.punchCooldown = false;
            console.log("test");
            let punchObject
            switch (punch){
                case "left":
                    punchObject = new Punch("punch", this.position.x-32, this.position.y,64,64, -64, 0);
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, "200")

                    break;
                case "right":
                    punchObject = new Punch("punch", this.position.x+this.dimensions.width-32, this.position.y,64,64, this.dimensions.width, 0);
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, "200")

                    break;
                case "up":
                    punchObject = new Punch("punch", this.position.x, this.position.y-this.dimensions.height+32,64,64, 0, -this.dimensions.height);
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, "200")
                    break;

                case "down":
                    punchObject = new Punch("punch", this.position.x, this.position.y+this.dimensions.height-32,64,64, 0, +this.dimensions.height);
                    gameManager.addGameObject(punchObject);

                    setTimeout(() => {
                        punchObject.isActive = false;
                    }, "200")
                    break;

                    break;
            }
            setTimeout(() => {
                this.punchCooldown = true;
            }, "400");
        }
        this.punch = "";
    }

    spawnBomb(){
        let bomb = new Bomb("punch", this.position.x, this.position.y,64,64);
        gameManager.addGameObject(bomb);
        this.bomb = false;

    }

    onCollision(otherObject) {

    }

}
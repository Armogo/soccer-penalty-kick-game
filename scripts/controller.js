import { MODEL } from "./model.js";
import { VIEW } from "./view.js";

const GAME_STATE = {
  chooseDirection: "chooseDirection",
  chooseRightArrow: "chooseRightArrow",
  chooseLeftArrow: "chooseLeftArrow",
  showResult: "showResult",
};

const CONTROLLER = {
  currentState: GAME_STATE.chooseDirection,

  // if player accidentally refreshes the browser tab, the score remains
  inheritPreviousScore() {
    MODEL.score = MODEL.getScore() || MODEL.score;
    VIEW.showScore();
  },
  addEventHandler() {
    VIEW.arrowElement.left.addEventListener("click", () => {
      MODEL.playerShootingDirection = GAME_STATE.chooseLeftArrow;
      VIEW.changeArrowStyle();
      if (this.currentState !== GAME_STATE.showResult) {
        this.showResult();
      }
    });

    VIEW.arrowElement.right.addEventListener("click", () => {
      MODEL.playerShootingDirection = GAME_STATE.chooseRightArrow;
      VIEW.changeArrowStyle();
      if (this.currentState !== GAME_STATE.showResult) {
        this.showResult();
      }
    });

    VIEW.btnElement.powerBall.addEventListener("click", () => {
      MODEL.powerBallToggle = !MODEL.powerBallToggle;
      VIEW.changePowerBallStyle();
    });

    VIEW.btnElement.nextRound.addEventListener("click", () => {
      if (this.currentState === GAME_STATE.showResult) {
        this.nextRound();
      }
    });
  },
  decideBlockingDirection() {
    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
      MODEL.gkBlockingDirection = GAME_STATE.chooseLeftArrow;
    } else {
      MODEL.gkBlockingDirection = GAME_STATE.chooseRightArrow;
    }
  },
  showResult() {
    let scoreCountString;

    this.currentState = GAME_STATE.showResult;
    this.decideBlockingDirection();

    switch (MODEL.powerBallToggle) {
      case true:
        if (MODEL.gkBlockingDirection === MODEL.playerShootingDirection) {
          MODEL.changeScore(1);
          VIEW.showResult("gk--got-hit", (scoreCountString = "+1"));
        } else {
          MODEL.changeScore(-1);
          VIEW.showResult("gk--safe", (scoreCountString = "-1"));
        }
        break;

      case false:
        if (MODEL.gkBlockingDirection === MODEL.playerShootingDirection) {
          VIEW.showResult("gk--succeed", (scoreCountString = "+0"));
        } else {
          MODEL.changeScore(1);
          VIEW.showResult("gk--fail", (scoreCountString = "+1"));
        }
        break;
    }
    MODEL.saveScore();
  },
  nextRound() {
    this.currentState = GAME_STATE.chooseDirection;

    MODEL.nextRound();
    VIEW.nextRound();
  },
  gameOnStart() {
    this.inheritPreviousScore();
    this.addEventHandler();
  },
};

export { GAME_STATE, CONTROLLER };

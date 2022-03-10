import { GAME_STATE } from "./controller.js";
import { MODEL } from "./model.js";
import { CONTROLLER } from "./controller.js";

const VIEW = {
  arrowElement: {
    left: document.querySelector(".game__view__action-area__left-arrow"),
    right: document.querySelector(".game__view__action-area__right-arrow"),
  },
  gkElement: {
    gk: document.querySelector(".game__view__action-area__center__gk"),
  },
  ballElement: {
    ball: document.querySelector(".ball-img"),
    powerBall: document.querySelector(".power-ball-img"),
  },
  scoreElement: {
    counter: document.querySelector(".game__sidebar__score-counter"),
    board: document.querySelector(".game__sidebar__scoreboard"),
    score: document.querySelector(".game__sidebar__scoreboard__score"),
  },
  btnElement: {
    powerBall: document.querySelector(".game__sidebar__power-btn"),
    nextRound: document.querySelector(".game__sidebar__next-round-btn"),
  },

  // when arrow is chosen
  changeArrowStyle() {
    if (MODEL.playerShootingDirection === GAME_STATE.chooseLeftArrow) {
      this.arrowElement.right.classList.remove("arrow--right--clicked");
      this.arrowElement.left.classList.add("arrow--left--clicked");
    } else if (MODEL.playerShootingDirection === GAME_STATE.chooseRightArrow) {
      this.arrowElement.left.classList.remove("arrow--left--clicked");
      this.arrowElement.right.classList.add("arrow--right--clicked");
    }
  },

  // change power ball button style
  changePowerBallStyle() {
    if (MODEL.powerBallToggle) {
      this.btnElement.powerBall.classList.add("power-btn--clicked");
      this.ballElement.powerBall.style.display = "initial";
      this.ballElement.ball.style.display = "none";
    } else {
      this.btnElement.powerBall.classList.remove("power-btn--clicked");
      this.ballElement.powerBall.style.display = "";
      this.ballElement.ball.style.display = "";
    }
  },
  btnUI() {
    if (CONTROLLER.currentState === GAME_STATE.showResult) {
      this.btnElement.nextRound.style.display = "initial";
    } else if (CONTROLLER.currentState === GAME_STATE.chooseDirection) {
      this.btnElement.nextRound.style.display = "";
    }
  },
  ballFly() {
    if (CONTROLLER.currentState === GAME_STATE.showResult) {
      if (MODEL.playerShootingDirection === GAME_STATE.chooseLeftArrow) {
        this.ballElement.ball.classList.add("ball--go-left");
        this.ballElement.powerBall.classList.add("power-ball--go-left");
      } else if (
        MODEL.playerShootingDirection === GAME_STATE.chooseRightArrow
      ) {
        this.ballElement.ball.classList.add("ball--go-right");
        this.ballElement.powerBall.classList.add("power-ball--go-right");
      }
    } else if (CONTROLLER.currentState === GAME_STATE.chooseDirection) {
      this.ballElement.ball.classList.remove("ball--go-left", "ball--go-right");
      this.ballElement.powerBall.classList.remove(
        "power-ball--go-left",
        "power-ball--go-right"
      );
    }
  },
  showScore(scoreCountString) {
    if (scoreCountString !== "next round") {
      let scoreCount = Number(scoreCountString);

      this.scoreElement.score.innerHTML = MODEL.score;

      if (scoreCount > 0) {
        this.scoreElement.counter.style.color = "rgb(54, 186, 66)";
      } else if (scoreCount < 0) {
        this.scoreElement.counter.style.color = "rgb(218, 41, 41)";
      } else {
        this.scoreElement.counter.style.color = "rgb(0, 0, 0)";
      }

      this.scoreElement.counter.textContent = scoreCountString;
    } else {
      this.scoreElement.counter.textContent = "";
    }
  },
  showResult(state, scoreCountString) {
    let shootLeft =
      MODEL.playerShootingDirection === GAME_STATE.chooseLeftArrow;
    let shootRight =
      MODEL.playerShootingDirection === GAME_STATE.chooseRightArrow;

    this.btnUI();
    this.ballFly();
    this.showScore(scoreCountString);

    switch (state) {
      case "gk--got-hit":
        if (shootLeft) {
          this.gkElement.gk.classList.add("gk--left--hit-by-power-ball");
        } else if (shootRight) {
          this.gkElement.gk.classList.add("gk--right--hit-by-power-ball");
        }

        break;

      case "gk--safe":
        if (shootLeft) {
          this.gkElement.gk.classList.add("gk--right--fail-blocking");
        } else if (shootRight) {
          this.gkElement.gk.classList.add("gk--left--fail-blocking");
        }

        break;

      case "gk--succeed":
        if (shootLeft) {
          this.gkElement.gk.classList.add("gk--left--succeed-blocking");
        } else if (shootRight) {
          this.gkElement.gk.classList.add("gk--right--succeed-blocking");
        }

        break;

      case "gk--fail":
        if (shootLeft) {
          this.gkElement.gk.classList.add("gk--right--fail-blocking");
        } else if (shootRight) {
          this.gkElement.gk.classList.add("gk--left--fail-blocking");
        }

        break;
    }
  },
  nextRound() {
    this.btnUI();
    this.ballFly();
    this.showScore("next round");

    // set gk back to normal state
    this.gkElement.gk.classList.remove(
      "gk--left--succeed-blocking",
      "gk--right--succeed-blocking",
      "gk--left--fail-blocking",
      "gk--right--fail-blocking",
      "gk--left--hit-by-power-ball",
      "gk--right--hit-by-power-ball"
    );

    // set arrow back to normal state
    this.arrowElement.left.classList.remove("arrow--left--clicked");
    this.arrowElement.right.classList.remove("arrow--right--clicked");
  },
};

export { VIEW };

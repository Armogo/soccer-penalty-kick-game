const MODEL = {
  playerShootingDirection: "",
  gkBlockingDirection: "",
  powerBallToggle: false,
  score: 0,

  changeScore(number) {
    this.score += number;
  },

  saveScore() {
    JSON.stringify(sessionStorage.setItem("score", this.score));
  },
  getScore() {
    return JSON.parse(sessionStorage.getItem("score"));
  },
  nextRound() {
    (this.playerShootingDirection = ""), (this.gkBlockingDirection = "");
  },
};

export { MODEL };

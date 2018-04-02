import welcomeNode from "./templates/welcome";
import {renderScreen} from "./service";

const startNewGame = () => {
  renderScreen(welcomeNode);
};

export default startNewGame;

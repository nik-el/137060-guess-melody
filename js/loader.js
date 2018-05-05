import {adaptData} from './game/game-adapter';

const ServerParameters = {
  SERVER_URL: `https://es.dump.academy/guess-melody`,
  APP_ID: 24312423424,
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${ServerParameters.SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptData);
  }

  static loadResults() {
    return fetch(`${ServerParameters.SERVER_URL}/stats/:${ServerParameters.APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResults(state) {
    const {score, mistakes, time} = state;
    const requestSettings = {
      body: JSON.stringify({score, mistakes, time}),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${ServerParameters.SERVER_URL}/stats/:${ServerParameters.APP_ID}`, requestSettings).then(checkStatus);
  }
}

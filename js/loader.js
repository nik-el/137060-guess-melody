import {adaptData} from './game/game-adapter';

const SERVER_URL = `https://es.dump.academy/guess-melody`;

const APP_ID = 7777777;

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
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptData);
  }

  static loadResults() {
    return fetch(`${SERVER_URL}/stats/:${APP_ID}`).then(checkStatus).then(toJSON);
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
    return fetch(`${SERVER_URL}/stats/:${APP_ID}`, requestSettings).then(checkStatus);
  }
}

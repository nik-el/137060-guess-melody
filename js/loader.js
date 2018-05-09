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

const getAudioUrls = (questions) => {
  const audioUrls = new Set();

  for (const question of questions) {
    if (question.type === `artist`) {
      audioUrls.add(question.src);
    } else if (question.type === `genre`) {
      question.answers.forEach((answer) => {
        audioUrls.add(answer.src);
      });
    }
  }

  return audioUrls;
};

const loadAudio = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = `auto`;
    audio.src = url;

    audio.oncanplay = () => resolve(audio);
    audio.onerror = () => reject(`Не удалось загрузить аудио: ${url}`);
  });
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${ServerParameters.SERVER_URL}/questions`)
        .then(checkStatus)
        .then(toJSON)
        .then(adaptData);
  }

  static loadAllTracks(questions) {
    const audioPromise = [];
    for (const audio of getAudioUrls(questions)) {
      audioPromise.push(loadAudio(audio));
    }
    return Promise.all(audioPromise).then((tracks) => {
      return {questions, tracks};
    });
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

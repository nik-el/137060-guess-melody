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

const getAudioUrls = (questions) => {
  const audioUrls = [];

  for (const question of questions) {
    if (question.type === `artist`) {
      audioUrls.push(question.src);
    } else if (question.type === `genre`) {
      question.answers.forEach((answer) => {
        audioUrls.push(answer.src);
      });
    }
  }
  return audioUrls;
};

const loadAudio = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplay = () => resolve(audio);
    audio.onerror = () => reject(`Не удалось загрузить аудио: ${url}`);
    audio.src = url;
  });
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptData)
      .then((questions) => getAudioUrls(questions).map((audio) => loadAudio(audio)))
      .then((audioPromises) => Promise.all(audioPromises));
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

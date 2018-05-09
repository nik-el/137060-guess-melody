import {GameStates} from './game-data';

export const adaptData = (data) => {
  data.forEach((question, index) => {
    if (data[index + 1]) {
      question.next = `${index + 1}`;
    } else {
      question.next = GameStates.RESULT;
    }

    if (question.type === GameStates.GENRE_LEVEL) {
      for (const answer of question.answers) {
        answer.isCorrect = question.genre === answer.genre;
      }
    }

    data[index] = question;
  });

  data.result = {type: `result`};
  return data;
};

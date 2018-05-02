const newLevels = {};

export const adaptData = (data) => {
  data.forEach((question, index) => {

    if (data[index + 1]) {
      question.next = `${index + 1}`;
    } else {
      question.next = `result`;
    }

    if (question.type === `genre`) {
      for (const answer of question.answers) {
        answer.isCorrect = question.genre === answer.genre;
      }
    }

    newLevels[`${index}`] = question;
  });

  newLevels.result = {type: `result`};
  return newLevels;
};

export const adaptData = (data) => {
  data.map((question, index) => {
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

    data[`${index}`] = question;
  });

  data.result = {type: `result`};
  return data;
};

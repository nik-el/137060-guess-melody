const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

const newLevels = {};

export const adaptServerData = (data) => {
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

  console.log(newLevels);
  return newLevels;
};

// const adaptArtistAnswers = (answers) =>
//   answers.map((answer) => ({
//     name: answer.title,
//     pic: answer.image.url,
//     isCorrect: answer.isCorrect
//   }));
//
// const adaptGenreAnswers = (answers, genre) =>
//   answers.map((answer) => ({
//     audio: answer.src,
//     isCorrect: answer.genre === genre
//   }));

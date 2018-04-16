const INITIAL_STATE = {
  mistakes: 3,
  time: 300,
  score: 0,
};

const currentAnswers = [];

const currentResult = {
  mistakes: 3,
  time: 300,
  score: 0,
};

const resultsArray =
  [
    {mistakes: 2, score: 5, time: 30},
    {mistakes: 2, score: 10, time: 30},
    {mistakes: 2, score: 15, time: 30}
  ];

const GAME_BY_ARTISTS = {
  'artist-1': {
    track: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        img: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        img: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false,
      },
      {
        artist: `Audionautix`,
        img: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: false,
      },
    ],
    next: `artist-2`,
  },
  'artist-2': {
    track: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Riot`,
        img: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        img: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false,
      },
      {
        artist: `Gunnar Olsen`,
        img: `https://f4.bcbits.com/img/0004181452_10.jpg`,
        isCorrect: false,
      },
    ],
    next: `artist-3`,
  },
  'artist-3': {
    track: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        img: `http://rhyme.ru/wp-content/uploads/2015/06/1ccf24cebd0007a4.jpg`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        img: `http://www.mulierchile.com/run-dmc/run-dmc-001.jpg`,
        isCorrect: false,
      },
      {
        artist: `Audionautix`,
        img: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: false,
      },
    ],
    next: `artist-4`,
  },
  'artist-4': {
    track: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        img: `http://cdn.ppcorn.com/wp-content/uploads/sites/14/2016/02/The-Who-2-ppcorn.jpg`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        img: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false,
      },
      {
        artist: `Audionautix`,
        img: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: false,
      },
    ],
    next: `artist-5`,
  },
  'artist-5': {
    track: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        img: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        img: `https://i.vimeocdn.com/portrait/992615_300x300`,
        isCorrect: false,
      },
      {
        artist: `Audionautix`,
        img: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
        isCorrect: false,
      },
    ],
    next: `genre-1`,
  },
};

const GAME_BY_GENRE = {
  'genre-1': {
    genre: `рок`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
    ],
    next: `genre-2`
  },
  'genre-2': {
    genre: `рок`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
    ],
    next: `genre-3`
  },
  'genre-3': {
    genre: `рок`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
    ],
    next: `genre-4`
  },
  'genre-4': {
    genre: `рок`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
    ],
    next: `genre-5`
  },
  'genre-5': {
    genre: `рок`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        name: `Long Stroll`,
        image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        genre: `Jazz`,
        isCorrect: true,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
      {
        artist: `Jingle Punks`,
        name: `In the Land of Rhinoplasty`,
        image: `https://i.vimeocdn.com/portrait/992615_300x300`,
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        isCorrect: false,
      },
    ],
    next: `end`
  }
};

export {INITIAL_STATE, currentResult, resultsArray, currentAnswers, GAME_BY_ARTISTS, GAME_BY_GENRE};

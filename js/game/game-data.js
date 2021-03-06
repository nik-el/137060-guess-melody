export const INITIAL_STATE = Object.freeze({
  mistakes: 0,
  time: 300,
  score: 0,
  level: `0`,
});

export const GameRules = Object.freeze({
  AVAILABLE_MISTAKES: 2,
  FAST_TIME: 30,
  MIN_ANSWERS: 10,
  END_TIME: 30,
});

export const GameStates = Object.freeze({
  ARTIST_LEVEL: `artist`,
  GENRE_LEVEL: `genre`,
  RESULT: `result`,
});


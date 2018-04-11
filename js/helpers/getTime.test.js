import Timer from './getTime';
import {assert} from 'chai';

describe(`getTime`, () => {

  it(`should return null when timer not consistent`, () => {
    let timer = new Timer([]);
    assert.isNull(timer.tick());

    timer = new Timer(-1);
    assert.isNull(timer.tick());
  });

  it(`should return timeout message `, () => {
    const timer = new Timer(0);
    assert.strictEqual(timer.tick(), `Time is over!`);

  });

  it(`should return current value of tiemr`, () => {
    const timer = new Timer(10);

    assert.strictEqual(timer.tick(), 9);
    assert.strictEqual(timer.tick(), 8);
    assert.strictEqual(timer.tick(), 7);
  });


});

import Timer from '../get-time';
import {assert} from 'chai';

suite(`getTime`, () => {

  test(`should return -1 when time is over `, () => {
    const timer = new Timer(0);

    const actual = timer.tick();
    const expected = -1;

    assert.strictEqual(actual, expected);
  });

  test(`should return current value of Timer`, () => {
    const timer = new Timer(10);

    let actual = timer.tick();
    let expected = 9;
    assert.strictEqual(actual, expected);

    actual = timer.tick();
    expected = 8;
    assert.strictEqual(actual, expected);

    actual = timer.tick();
    expected = 7;
    assert.strictEqual(actual, expected);
  });


});

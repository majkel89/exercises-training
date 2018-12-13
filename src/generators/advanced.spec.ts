describe('generators', () => {

  // define NumberIterator datatype here
  type NumberIterator = IterableIterator<number>;

  function* evenNumbers(): NumberIterator {
    let result, value = 0;
    while (true) {
      result = yield value;
      value += 2;
      if (result) {
        return result
      }
    }
  }

  function* oddNumbers(): NumberIterator {
    let result, value = 1;
    while (true) {
      result = yield value;
      value += 2;
      if (result) {
        return result
      }
    }
  }

  it('can run in infinite loops', () => {
    const odds: NumberIterator = oddNumbers();

    expect(odds.next().value).toBe(1);
    expect(odds.next().value).toBe(3);
    expect(odds.next().value).toBe(5);
    expect(odds.next(12345).done).toBe(true);
    expect(odds.next().value).toBe(undefined);

    const even: NumberIterator = evenNumbers();

    expect(even.next().value).toBe(0);
    expect(even.next().value).toBe(2);
    expect(even.next().value).toBe(4);
    expect(even.next(67890).done).toBe(true);
    expect(even.next().value).toBe(undefined);
  });

  it('can be terminated manually using .return()', () => {
    const odds: NumberIterator = oddNumbers();

    expect(odds.next().value).toBe(1);
    expect(odds.return(12345).value).toBe(12345);
    expect(odds.next().done).toBe(true);
    expect(odds.next().value).toBe(undefined);

    const even: NumberIterator = evenNumbers();

    expect(even.next().value).toBe(0);
    expect(even.next(67890).value).toBe(67890);
    expect(even.next()).toEqual({ value: undefined, done: true });
  });

  function* allNumbers(type?: "even" | "odd"): NumberIterator {
    while (true) {
      if (type === 'even') {
        type = yield* evenNumbers()
      } else if (type === 'odd') {
        type = yield* oddNumbers()
      } else {
        type = yield
      }
    }
  }

  it('can delegate execution to another generator', () => {
    const numbers: NumberIterator = allNumbers();

    expect(numbers.next().value).toBe(undefined);

    expect(numbers.next("even").value).toBe(0);
    expect(numbers.next().value).toBe(2);
    expect(numbers.next().value).toBe(4);

    expect(numbers.next("odd").value).toBe(1);
    expect(numbers.next().value).toBe(3);
    expect(numbers.next().value).toBe(5);

    expect(numbers.next("God bless America").value).toBe(undefined);
    expect(numbers.next().value).toBe(undefined);

    expect(numbers.next("even").value).toBe(0);
    expect(numbers.next().value).toBe(2);
  })
});

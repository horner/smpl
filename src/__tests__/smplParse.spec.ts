import { smplParse } from '..';

describe('workout workflows', () => {
  const workflowOne = `
  5 rounds for time
    20 Pull-ups
    30 Push-ups
    40 Sit-ups
    50 Squats
  `;

  const workflowTwo = `
  As many rounds as possible (AMRAP) in 20 min
    5 Pull-ups
    10 Push-ups
    15 Squats
  `;

  it(`should correctly parse the workflowOne`, () => {
    expect(smplParse(workflowOne)).toEqual([
      {
        code: ['5', 'rounds'],
        compound: false,
        indent: 2,
        line: 2,
        loop: true,
        operation: 'rounds',
        pline: 0,
        src: '  5 rounds for time',
        value: 5
      },
      {
        code: ['20'],
        compound: false,
        indent: 4,
        line: 3,
        loop: false,
        operation: '',
        pline: 2,
        src: '    20 Pull-ups',
        value: 20
      },
      {
        code: ['30'],
        compound: false,
        indent: 4,
        line: 4,
        loop: false,
        operation: '',
        pline: 2,
        src: '    30 Push-ups',
        value: 30
      },
      {
        code: ['40'],
        compound: false,
        indent: 4,
        line: 5,
        loop: false,
        operation: '',
        pline: 2,
        src: '    40 Sit-ups',
        value: 40
      },
      {
        code: ['50'],
        compound: false,
        indent: 4,
        line: 6,
        loop: false,
        operation: '',
        pline: 2,
        src: '    50 Squats',
        value: 50
      }
    ]);
  });

  it(`should correctly parse the workflowTwo`, () => {
    expect(smplParse(workflowTwo)).toEqual([
      {
        code: ['rounds', 'amrap', 'in', '20', 'min'],
        compound: false,
        indent: 2,
        line: 2,
        loop: true,
        operation: 'amrap',
        pline: 0,
        src: '  As many rounds as possible (AMRAP) in 20 min',
        value: 20
      },
      {
        code: ['5'],
        compound: false,
        indent: 4,
        line: 3,
        loop: false,
        operation: '',
        pline: 2,
        src: '    5 Pull-ups',
        value: 5
      },
      {
        code: ['10'],
        compound: false,
        indent: 4,
        line: 4,
        loop: false,
        operation: '',
        pline: 2,
        src: '    10 Push-ups',
        value: 10
      },
      {
        code: ['15'],
        compound: false,
        indent: 4,
        line: 5,
        loop: false,
        operation: '',
        pline: 2,
        src: '    15 Squats',
        value: 15
      }
    ]);
  });
});

// TODO: add other supported cases

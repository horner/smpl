import { ICommand } from './interfaces';

export const smplParse = (s: string): unknown => {
  if (!s) return [];

  const script = s.replace(/\t/g, '  '); // re = RegExp(' {' + 4 + '}','g');
  const lines = script.split('\n');

  const cmdtree: ICommand[] = [];
  const cmdloopstack: ICommand[] = [];

  for (let i = 0; i < lines.length; i++) {
    // Go thru each line.
    let indent = 0;
    while (lines[i].charAt(indent) == ' ') {
      indent++;
    }

    let parent: ICommand = cmdloopstack[cmdloopstack.length - 1];
    while (parent && parent.indent >= indent) {
      cmdloopstack.pop(); // when a dedent occurs then we should pop a loop off too.
      parent = cmdloopstack[cmdloopstack.length - 1];
    }
    if (parent && parent.compound && i > 1) {
      if (indent < cmdtree[i - 1].indent) {
        // do we have a dedent.
        // eslint-disable-next-line max-len
        cmdloopstack.pop(); // when we have a compound statement, and we detect a dedent, pop off a loop.
        parent = cmdloopstack[cmdloopstack.length - 1];
      }
    }
    const pline = parent ? parent.line : 0;
    const cmd: ICommand = {
      value: undefined as undefined | number,
      line: i + 1, // actual line number in the script.
      indent: indent, // number of spaces of ident
      operation: '', // the essential 'operation' (or verb) of the command
      loop: false, // flag indicating if the verb is a loop/block.
      code: [] as string[], // other intrepeted words/codes in the command
      src: lines[i], // the source of the line without any editing done.
      pline: pline, // if the command is in a loop, this is the parent.
      compound: false // compound commands indicating it was split (single line, multiple entries)
    }; // setup cmd structure

    const stmt: RegExpMatchArray | null = lines[i].match(
      /\w+|'[^']+'|"[^"]+"|{{(.*?)}}|\*|:/g
    ); // break the line into words, "quoted" or 'quoted' tokens, and {{tags}}
    if (stmt) {
      for (let j = 0; j < stmt.length; j++) {
        const z = stmt[j].charAt(0);
        if (z == '{' || z == '"' || z == "'") {
          cmd.code.push(stmt[j]);
        } else {
          const candidate = stmt[j].toLowerCase();

          // eslint-disable-next-line max-depth
          switch (candidate) {
            case 'rounds': // start a work timer (if not already running)
            case 'amrap': // start a work timer up to "value" seconds
            case 'afap': // start a work timer until stopped by user
            case 'emom': // start a 1 min work timer, redo "value" times
              cmd.loop = true;
            //break; do not break, cuz we want the rest.
            case 'rest': // start a rest timer for "value" seconds
            case 'tabata': // start a 20 second work timer, 10 seconds rest, 8 rounds
              cmd.code.push(candidate);
              cmd.operation = candidate;
              break;
            case 'sec':
            case 'second':
            case 'seconds':
              cmd.code.push('sec');
              break;
            case 'min':
            case 'minute':
            case 'minutes':
              cmd.code.push('min');
              break;
            case 'times':
              cmd.code.push('rounds');
              break;
            case 'on':
            case 'in':
            case 'into':
              // eslint-disable-next-line max-depth
              if (!(cmd.code.length && cmd.code[cmd.code.length - 1] == 'in')) {
                cmd.code.push('in');
                break;
              }
            // else do nothing
            case ':':
              cmd.loop = true;
            // no break
            default:
              // eslint-disable-next-line no-case-declarations
              const value = parseInt(candidate);
              // eslint-disable-next-line max-depth
              if (value > 0) {
                cmd.code.push(candidate);
                cmd.value = value;
              } else {
                // eslint-disable-next-line max-depth
                if (candidate.charAt(0) == 'x') {
                  const reps = parseInt(candidate.substring(1));
                  // eslint-disable-next-line max-depth
                  if (reps > 0) {
                    const tcmd: ICommand = {
                      line: i + 1,
                      indent: indent,
                      operation: 'rounds',
                      loop: true,
                      value: reps,
                      code: [reps, 'rounds'],
                      src: candidate,
                      pline: parent.line,
                      compound: true
                    }; // setup cmd structure
                    cmd.compound = true;
                    cmdtree.push(tcmd);
                    cmdloopstack.push(tcmd);
                  }
                }
              }
          }
        }
      }
      cmdtree.push(cmd);
      if (cmd.loop) cmdloopstack.push(cmd);
    }
  }
  return cmdtree;
};

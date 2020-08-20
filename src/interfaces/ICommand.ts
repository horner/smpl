export interface ICommand {
  line: number;
  indent: number;
  operation: string;
  loop: boolean;
  value?: number | string;
  code: (string | number)[];
  src: string;
  pline: number;
  compound: boolean;
}

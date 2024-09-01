
import { IncomingForm } from 'formidable';

type ParsedForm = {
  fields: { [key: string]: string | undefined };
  files: { [key: string]: formidable.File[] };
};

declare module 'formidable' {
  export function parse(req: Request): Promise<ParsedForm>;
}

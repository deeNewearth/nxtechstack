import { Connection } from 'mongoose';

export abstract class BaseMigration {
  constructor(protected connection: Connection) {}

  abstract up(): Promise<void>;
  abstract down(): Promise<void>;
}

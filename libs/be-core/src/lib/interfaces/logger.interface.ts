export interface ILogger {
  error(message: string, trace?: string): void;
  warn(message: string): void;
  info(message: string): void;
  debug(message: string): void;
}

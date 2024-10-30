export class ErrorResponseDto {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode: string,
    public timestamp: string,
    public path: string
  ) {}
}

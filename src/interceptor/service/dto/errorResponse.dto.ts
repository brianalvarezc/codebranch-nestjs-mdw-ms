export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error: any;
  
  constructor(
    statusCode?: number,
    message?: string,
    error?: string,
  ) {}
}

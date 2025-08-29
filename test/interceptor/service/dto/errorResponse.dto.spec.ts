import { ErrorResponseDto } from 'interceptor/service/dto/errorResponse.dto';

describe('ErrorResponseDto', () => {
    it('should create an instance with default values', () => {
        const dto = new ErrorResponseDto();
        expect(dto.statusCode).toBeUndefined();
        expect(dto.message).toBeUndefined();
        expect(dto.error).toBeUndefined();
    });

    it('should assign values passed to the constructor', () => {
        const dto = new ErrorResponseDto(404, 'Not Found', 'Resource missing');
        expect(dto.statusCode).toBe(404);
        expect(dto.message).toBe('Not Found');
        expect(dto.error).toBe('Resource missing');
    });

    it('should allow any type for error property', () => {
        const errorObj = { detail: 'Invalid input' };
        const dto = new ErrorResponseDto(400, 'Bad Request', errorObj as any);
        expect(dto.error).toEqual(errorObj);
    });
});
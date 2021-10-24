import CustomError from '~/error/CustomError';

class HttpError extends CustomError {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;

        this.name = 'HttpError';
    }
}

export default HttpError;

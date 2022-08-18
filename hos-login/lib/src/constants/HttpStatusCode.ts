export enum HttpStatusCode {
    CONTINUE = 100,
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    REDIRECT_TEMP = 307,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    UNAUTHORIZED = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    SERVER_ERROR = 500
}
import { getToken } from "../useToken";
import { ApiError, BadRequestError, NotFoundRequestError, UnauthorizedError } from "./exceptions";

export function* get<T>(resourceUrl: string) {
    const result: T = yield fetchBase('GET', resourceUrl);
    return result;
};

export function* post<TBody, TRes>(resourceUrl: string, data: TBody) {
    const result: TRes = (yield fetchBase('POST', resourceUrl, data));
    return result;
};

export function* put<TBody, TRes>(resourceUrl: string, data: TBody) {
    const result: TRes = (yield fetchBase('PUT', resourceUrl, data));
    return result;
};


function* fetchBase(method: string, resourceUrl: string, data: any = null, retry?: boolean): any {
    const token = getToken();

    const result: Response = yield fetch(resourceUrl, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    return yield handleResponse(result, method, resourceUrl, data);
}


function* handleResponse(response: Response, method: string, apiName: string, resourceUrl: string, data: any = null): any {

    if (response.status === 401) {
        revokeToken(apiName);
        return new UnauthorizedError();
    }

    if (response.status === 200) {
        const textResponse = yield response.text();
        try {
            return JSON.parse(textResponse);
        }
        catch {
            return textResponse;
        }
    }

    if (response.status === 400) {
        console.log('handleResponse ...400');
        const data = yield response.text();
        throw new BadRequestError(data);
    }

    if (response.status === 404) {
        console.log('handleResponse ...404');
        throw new NotFoundRequestError();
    }

    console.log('handleResponse ...none');
    const text = yield response.text();

    throw new ApiError(text);
}

function revokeToken(apiName: string) {
    sessionStorage.removeItem('token');
};
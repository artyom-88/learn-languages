import { httpClient } from 'common/http-client';

export const createSessionApi = (): Promise<string> => httpClient.post('session/create').json();

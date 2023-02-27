import * as Sentry from '@sentry/node';

export default class LogService {

    static logError(e) {
        console.error(e);
        Sentry.captureException(e);
    }

}
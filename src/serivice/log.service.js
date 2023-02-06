import * as Sentry from '@sentry/node';

export default class LogService {

    logError(e) {
        Sentry.captureException(e);
    }

}
export const ReportReason = {
    ABUSIVE_CONTENT: 'ABUSIVE_CONTENT',
    SHOCK_CONTENT: 'SHOCK_CONTENT',
    ILLEGAL_CONTENT: 'ILLEGAL_CONTENT',
    SPAM: 'SPAM',
    WEBSITE_RULES_VIOLATION: 'WEBSITE_RULES_VIOLATION',
    FLOOD: 'FLOOD'
};

export const validateReportReason = reason => {
    console.log(reason);
    if (Object.keys(ReportReason).filter(key => ReportReason[key] === reason).length === 0) {
        return 'invalidReportReason';
    }
    console.log('valid');
    return undefined;
};

export const ReportStatus = {
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    NOT_VIEWED: 'NOT_VIEWED'
};

export const validateReportStatus = status => {
    Object.keys(ReportReason).forEach(key => {
        if (ReportStatus[key] === status) {
            return undefined;
        }
    });

    return 'invalidReportStatus';
};

export const validateReportDescription = description => {
    if (!description || description.length === 0) {
        return undefined;
    }

    if (description.length > 100) {
        return 'descriptionIsTooLong';
    }

    return undefined;
};

export {default as ReportMenuItem} from './ReportMenuItem';
export {default as ReportReasonSelect} from './ReportReasonSelect';
export {default as ReportStatusSelect} from './ReportStatusSelect';
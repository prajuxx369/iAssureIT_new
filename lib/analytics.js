import { logEvent } from './firebase';

export const trackPageView = (page_path, page_title) => {
    logEvent('page_view', { page_path, page_title });
};

export const trackCtaClick = (cta_id, section_id, content_category) => {
    logEvent('click_cta_primary', { cta_id, section_id, content_category });
};

export const trackFormStart = () => {
    logEvent('form_start');
};

export const trackFormSubmitSuccess = () => {
    logEvent('form_submit_success');
};

export const trackFormSubmitFail = () => {
    logEvent('form_submit_fail');
};

export const trackScrollDepth = (scroll_depth) => {
    logEvent('scroll_depth', { scroll_depth });
};

export const trackServiceCardClick = (service) => {
    logEvent('service_card_click', { service });
};

export const trackCaseStudyOpen = (case_study) => {
    logEvent('case_study_open', { case_study });
};

export const trackOutboundClick = (url) => {
    logEvent('outbound_click', { url });
};
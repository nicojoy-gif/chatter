import ReactGA from 'react-ga4';

export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (eventName: string, eventParams?: object) => {
  ReactGA.send({ hitType: 'event', eventCategory: eventName, ...eventParams });
};

import { getWebVitals } from "./utils/webVitals";

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = getWebVitals();

    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }

  return undefined;
};

export default reportWebVitals;

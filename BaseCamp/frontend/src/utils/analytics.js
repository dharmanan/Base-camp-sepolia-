import { track } from '@vercel/analytics';

export const trackEvent = (eventName, properties = {}) => {
  track(eventName, properties);
};

// Predefined tracking functions for common events
export const trackWalletConnection = (walletType, userAddress) => {
  trackEvent('Wallet Connected', {
    walletType,
    userAddress: userAddress.slice(0, 6) + '...' + userAddress.slice(-4), // Privacy-safe
    timestamp: new Date().toISOString()
  });
};

export const trackContractDeployment = (contractType, networkChainId) => {
  trackEvent('Contract Deployed', {
    contractType,
    networkChainId,
    timestamp: new Date().toISOString()
  });
};

export const trackContractInteraction = (contractAddress, functionName, success) => {
  trackEvent('Contract Interaction', {
    contractAddress: contractAddress.slice(0, 6) + '...' + contractAddress.slice(-4),
    functionName,
    success,
    timestamp: new Date().toISOString()
  });
};

export const trackPageView = (pageName, userAgent = '') => {
  trackEvent('Page View', {
    pageName,
    userAgent: userAgent.slice(0, 50), // Truncate for privacy
    timestamp: new Date().toISOString()
  });
};

export const trackError = (errorType, errorMessage, component) => {
  trackEvent('Error', {
    errorType,
    errorMessage,
    component,
    timestamp: new Date().toISOString()
  });
};

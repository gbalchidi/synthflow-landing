// Umami Analytics Utility Functions
// Documentation: https://umami.is/docs/tracker-functions

declare global {
  interface Window {
    umami: {
      track: (event?: string | object, data?: object) => void;
      identify: (id?: string | object, data?: object) => void;
    };
    ym: (counterId: number, action: string, ...params: any[]) => void;
  }
}

// UTM parameters storage
export const UTM_STORAGE_KEY = 'synthflow_utm_params';

// Yandex Metrika counter ID
export const YM_COUNTER_ID = 104023076;

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: number;
}

export interface EventData {
  [key: string]: string | number | boolean;
}

// Check if Umami is loaded
export const isUmamiLoaded = (): boolean => {
  return typeof window !== 'undefined' && window.umami !== undefined;
};

// Check if Yandex Metrika is loaded
export const isYandexMetrikaLoaded = (): boolean => {
  return typeof window !== 'undefined' && window.ym !== undefined;
};

// Track custom event
export const trackEvent = (eventName: string, data?: EventData): void => {
  // Add UTM params to event data
  const utmParams = getStoredUTMParams();
  const enrichedData = {
    ...utmParams,
    ...data,
  };

  // Remove undefined values
  Object.keys(enrichedData).forEach(key => {
    if ((enrichedData as any)[key] === undefined) {
      delete (enrichedData as any)[key];
    }
  });

  // Track in Umami
  if (isUmamiLoaded()) {
    window.umami.track(eventName, enrichedData);
    console.log('Umami event tracked:', eventName, enrichedData);
  } else {
    console.warn('Umami not loaded, event not tracked:', eventName);
  }

  // Track in Yandex Metrika
  if (isYandexMetrikaLoaded()) {
    try {
      window.ym(YM_COUNTER_ID, 'reachGoal', eventName, enrichedData);
      console.log('YM event tracked:', eventName, enrichedData);
    } catch (error) {
      console.error('Error tracking YM event:', error);
    }
  } else {
    console.warn('Yandex Metrika not loaded, event not tracked:', eventName);
  }
};

// Track page view with custom data
export const trackPageView = (url?: string, title?: string): void => {
  if (!isUmamiLoaded()) return;

  const payload: any = {};
  if (url) payload.url = url;
  if (title) payload.title = title;

  window.umami.track(payload);
};

// Identify user session
export const identifyUser = (userId?: string, userData?: EventData): void => {
  if (!isUmamiLoaded()) return;

  if (userId) {
    window.umami.identify(userId, userData);
  } else if (userData) {
    window.umami.identify(userData);
  }
};

// Parse and store UTM parameters
export const captureUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname,
    timestamp: Date.now(),
  };

  // Store in sessionStorage if any UTM params exist
  const hasUTMParams = Object.keys(utmParams).some(key => 
    key.startsWith('utm_') && utmParams[key as keyof UTMParams]
  );

  if (hasUTMParams) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  }

  return utmParams;
};

// Get stored UTM parameters
export const getStoredUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Yandex Metrika E-commerce tracking
export const trackYMEcommerce = {
  // Track product view
  productView: (productId: string, name: string, price: number, category?: string) => {
    if (isYandexMetrikaLoaded()) {
      window.ym(YM_COUNTER_ID, 'reachGoal', 'PRODUCT_VIEW', {
        ecommerce: {
          currencyCode: 'RUB',
          detail: {
            products: [{
              id: productId,
              name: name,
              price: price,
              category: category || 'Subscription'
            }]
          }
        }
      });
    }
  },

  // Track add to cart
  addToCart: (productId: string, name: string, price: number, quantity: number = 1) => {
    if (isYandexMetrikaLoaded()) {
      window.ym(YM_COUNTER_ID, 'reachGoal', 'ADD_TO_CART', {
        ecommerce: {
          currencyCode: 'RUB',
          add: {
            products: [{
              id: productId,
              name: name,
              price: price,
              quantity: quantity
            }]
          }
        }
      });
    }
  },

  // Track purchase
  purchase: (orderId: string, products: Array<{id: string, name: string, price: number, quantity: number}>, total: number) => {
    if (isYandexMetrikaLoaded()) {
      window.ym(YM_COUNTER_ID, 'reachGoal', 'PURCHASE', {
        ecommerce: {
          currencyCode: 'RUB',
          purchase: {
            actionField: {
              id: orderId,
              revenue: total
            },
            products: products
          }
        }
      });
    }
  }
};

// Conversion tracking functions
export const trackConversion = {
  // Billing flow events
  billingStart: (planName: string, price: number) => {
    trackEvent('billing_start', {
      plan_name: planName,
      price: price,
    });
    // Also track as product view in YM
    trackYMEcommerce.productView(planName.toLowerCase(), planName, price, 'Subscription');
  },

  registrationComplete: (email: string, planName: string) => {
    const emailDomain = email.split('@')[1] || 'unknown';
    trackEvent('registration_complete', {
      email_domain: emailDomain,
      plan_name: planName,
    });
  },

  paymentInitiated: (planName: string, price: number, paymentMethod: string) => {
    trackEvent('payment_initiated', {
      plan_name: planName,
      price: price,
      payment_method: paymentMethod,
    });
    // Also track as add to cart in YM
    trackYMEcommerce.addToCart(planName.toLowerCase(), planName, price);
  },

  paymentSuccess: (planName: string, price: number, transactionId?: string) => {
    trackEvent('payment_success', {
      plan_name: planName,
      price: price,
      transaction_id: transactionId || 'unknown',
    });
    // Also track as purchase in YM
    trackYMEcommerce.purchase(
      transactionId || `order_${Date.now()}`,
      [{id: planName.toLowerCase(), name: planName, price: price, quantity: 1}],
      price
    );
  },

  paymentFailed: (planName: string, errorType: string) => {
    trackEvent('payment_failed', {
      plan_name: planName,
      error_type: errorType,
    });
  },
};

// Engagement tracking functions
export const trackEngagement = {
  heroCtaClick: () => trackEvent('hero_cta_click'),
  
  heroDemoClick: () => trackEvent('hero_demo_click'),
  
  featureView: (featureName: string, index: number) => {
    trackEvent('feature_view', {
      feature_name: featureName,
      feature_index: index,
    });
  },

  planSelect: (planName: string, price: number, discount?: number) => {
    trackEvent('plan_select', {
      plan_name: planName,
      price: price,
      discount: discount || 0,
    });
  },

  pricingCtaClick: (planName: string, price: number) => {
    trackEvent('pricing_cta_click', {
      plan_name: planName,
      price: price,
    });
  },

  testimonialView: (index: number, authorName: string) => {
    trackEvent('testimonial_view', {
      testimonial_index: index,
      author_name: authorName,
    });
  },

  footerLinkClick: (linkType: string, linkUrl: string) => {
    trackEvent('footer_link_click', {
      link_type: linkType,
      link_url: linkUrl,
    });
  },

  contactClick: (contactType: string) => {
    trackEvent('contact_click', {
      contact_type: contactType,
    });
  },
};

// Funnel tracking
export const trackFunnel = {
  landing: () => trackEvent('funnel_landing'),
  
  interest: () => trackEvent('funnel_interest'),
  
  pricingView: () => trackEvent('funnel_pricing_view'),
  
  billingStart: () => trackEvent('funnel_billing_start'),
  
  registration: () => trackEvent('funnel_registration'),
  
  payment: () => trackEvent('funnel_payment'),
};

// Time on page tracking
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    seconds: seconds,
    minutes: Math.floor(seconds / 60),
  });
};

// Scroll depth tracking
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    percentage: Math.round(percentage),
  });
};
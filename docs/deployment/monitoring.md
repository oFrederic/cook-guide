# Production Monitoring & Analytics

## 📊 Monitoring Overview

CookGuide implements comprehensive monitoring across all layers of the application to ensure reliability, performance, and user experience. This guide covers monitoring strategies, tools, and best practices.

## 🎯 Monitoring Strategy

### Monitoring Layers
```
┌─────────────────────────────────────────────────────────────┐
│                    User Experience                          │
│  • Real User Monitoring (RUM)                              │
│  • Core Web Vitals                                         │
│  • User Journey Tracking                                   │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│  • Error Tracking (Sentry)                                 │
│  • Performance Monitoring                                  │
│  • API Response Times                                      │
├─────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                     │
│  • Server Health                                           │
│  • Database Performance                                    │
│  • External Service Status                                 │
├─────────────────────────────────────────────────────────────┤
│                    Business Metrics                         │
│  • User Analytics                                          │
│  • Feature Usage                                           │
│  • Conversion Tracking                                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Monitoring Tools

### Primary Tools
| Tool | Purpose | Integration |
|------|---------|-------------|
| **Sentry** | Error tracking and performance monitoring | Frontend + Backend |
| **Google Analytics** | User analytics and behavior tracking | Frontend |
| **Railway/Render** | Infrastructure monitoring | Backend |
| **PostgreSQL** | Database performance monitoring | Database |
| **Cloudinary** | Image delivery analytics | External Service |

### Secondary Tools
| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Lighthouse CI** | Performance regression testing | CI/CD Pipeline |
| **WebPageTest** | Detailed performance analysis | Manual testing |
| **GTmetrix** | Performance optimization | Optimization |
| **UptimeRobot** | Uptime monitoring | External monitoring |

## 📈 Key Performance Indicators (KPIs)

### User Experience Metrics
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 5 seconds
- **First Contentful Paint (FCP)**: < 1.8 seconds

### Application Performance Metrics
- **API Response Time**: < 200ms average
- **Error Rate**: < 0.1%
- **Uptime**: > 99.9%
- **Database Query Time**: < 100ms average
- **Image Load Time**: < 1 second

### Business Metrics
- **User Engagement**: Average session duration > 5 minutes
- **Recipe Completion Rate**: > 80%
- **User Retention**: > 60% return within 30 days
- **Page Views per Session**: > 3 pages

## 🛠️ Implementation

### Frontend Monitoring (Sentry)
```typescript
// main.ts
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'cookguide.com', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter out development errors
    if (import.meta.env.DEV) {
      return null;
    }
    return event;
  },
  beforeBreadcrumb(breadcrumb) {
    // Filter out sensitive information
    if (breadcrumb.category === 'navigation') {
      delete breadcrumb.data?.url;
    }
    return breadcrumb;
  },
});

app.use(router);
app.mount('#app');
```

### Performance Monitoring
```typescript
// utils/performance.ts
export const trackPerformance = () => {
  // Core Web Vitals
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      switch (entry.entryType) {
        case 'largest-contentful-paint':
          trackMetric('LCP', entry.startTime);
          break;
        case 'first-input':
          trackMetric('FID', entry.processingStart - entry.startTime);
          break;
        case 'layout-shift':
          trackMetric('CLS', entry.value);
          break;
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

  // Custom metrics
  performance.mark('app-ready');
  performance.measure('app-initialization', 'navigationStart', 'app-ready');
};

const trackMetric = (name: string, value: number) => {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'performance', {
      metric_name: name,
      metric_value: value,
    });
  }
  
  // Send to Sentry
  Sentry.metrics.gauge(name, value);
};
```

### API Performance Monitoring
```typescript
// backend/middleware/performance.ts
import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Track request start
  Sentry.addBreadcrumb({
    category: 'http',
    type: 'http',
    data: {
      method: req.method,
      url: req.url,
      status_code: res.statusCode,
    },
  });
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Track response time
    Sentry.metrics.timing('http_request_duration', duration, {
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
    
    // Log slow requests
    if (duration > 1000) {
      Sentry.captureMessage('Slow API request detected', {
        level: 'warning',
        tags: {
          method: req.method,
          route: req.route?.path || req.path,
          duration: duration.toString(),
        },
      });
    }
  });
  
  next();
};
```

### Database Monitoring
```typescript
// backend/utils/database-monitor.ts
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/node';

export const createMonitoredPrisma = () => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
    ],
  });

  prisma.$on('query', (e) => {
    const duration = e.duration;
    
    // Track query performance
    Sentry.metrics.timing('database_query_duration', duration, {
      model: e.target,
      operation: e.operation,
    });
    
    // Alert on slow queries
    if (duration > 100) {
      Sentry.captureMessage('Slow database query detected', {
        level: 'warning',
        tags: {
          model: e.target,
          operation: e.operation,
          duration: duration.toString(),
        },
        contexts: {
          query: {
            sql: e.query,
            params: e.params,
          },
        },
      });
    }
  });

  prisma.$on('error', (e) => {
    Sentry.captureException(e.error, {
      tags: {
        model: e.target,
        operation: e.operation,
      },
    });
  });

  return prisma;
};
```

## 📊 Analytics Implementation

### Google Analytics 4
```typescript
// utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const initAnalytics = () => {
  const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  
  if (!GA_ID) return;
  
  // Load Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pagePath,
    });
  }
};
```

### Custom Event Tracking
```typescript
// composables/useAnalytics.ts
import { trackEvent } from '@/utils/analytics';

export const useAnalytics = () => {
  const trackRecipeView = (recipeId: string, recipeTitle: string) => {
    trackEvent('recipe_view', {
      recipe_id: recipeId,
      recipe_title: recipeTitle,
    });
  };
  
  const trackRecipeSearch = (query: string, resultsCount: number) => {
    trackEvent('recipe_search', {
      search_term: query,
      results_count: resultsCount,
    });
  };
  
  const trackRecipeFavorite = (recipeId: string, action: 'add' | 'remove') => {
    trackEvent('recipe_favorite', {
      recipe_id: recipeId,
      action: action,
    });
  };
  
  const trackCookingStart = (recipeId: string) => {
    trackEvent('cooking_start', {
      recipe_id: recipeId,
    });
  };
  
  const trackCookingComplete = (recipeId: string, duration: number) => {
    trackEvent('cooking_complete', {
      recipe_id: recipeId,
      cooking_duration: duration,
    });
  };
  
  return {
    trackRecipeView,
    trackRecipeSearch,
    trackRecipeFavorite,
    trackCookingStart,
    trackCookingComplete,
  };
};
```

## 🚨 Alerting & Notifications

### Error Alerting
```typescript
// backend/utils/alerting.ts
import * as Sentry from '@sentry/node';

export const setupAlerting = () => {
  // Configure Sentry alerting
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
    beforeSend(event) {
      // Filter out expected errors
      if (event.exception) {
        const exception = event.exception.values?.[0];
        if (exception?.type === 'ValidationError') {
          return null; // Don't alert on validation errors
        }
      }
      return event;
    },
  });
};
```

### Health Check Monitoring
```typescript
// backend/routes/health.ts
import { Router } from 'express';
import { prisma } from '../utils/database';

const router = Router();

router.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      cloudinary: 'unknown',
    },
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    },
  };
  
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  try {
    // Check Cloudinary
    const cloudinaryHealth = await checkCloudinaryHealth();
    health.services.cloudinary = cloudinaryHealth ? 'healthy' : 'unhealthy';
  } catch (error) {
    health.services.cloudinary = 'unhealthy';
  }
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

export default router;
```

## 📊 Dashboard & Reporting

### Sentry Dashboard
- **Error Trends**: Track error rates over time
- **Performance**: Monitor response times and throughput
- **User Impact**: See which errors affect the most users
- **Release Tracking**: Monitor new releases for issues

### Google Analytics Dashboard
- **User Acquisition**: Track how users find the app
- **User Behavior**: Monitor page views and user journeys
- **Conversion Funnels**: Track recipe completion rates
- **Audience Insights**: Understand user demographics

### Custom Metrics Dashboard
```typescript
// utils/metrics.ts
export const trackCustomMetrics = () => {
  // Recipe engagement metrics
  trackMetric('recipes_viewed_per_session', getRecipesViewedCount());
  trackMetric('average_cooking_time', getAverageCookingTime());
  trackMetric('favorite_recipes_count', getFavoriteRecipesCount());
  
  // User engagement metrics
  trackMetric('daily_active_users', getDailyActiveUsers());
  trackMetric('weekly_active_users', getWeeklyActiveUsers());
  trackMetric('monthly_active_users', getMonthlyActiveUsers());
};
```

## 🔄 Monitoring Maintenance

### Regular Reviews
- **Weekly**: Review error rates and performance metrics
- **Monthly**: Analyze user behavior and engagement trends
- **Quarterly**: Review and update monitoring strategy

### Alert Tuning
- **False Positives**: Adjust thresholds to reduce noise
- **Missing Alerts**: Add alerts for critical issues
- **Escalation**: Define escalation procedures for different alert types

### Performance Optimization
- **Query Optimization**: Monitor and optimize slow database queries
- **Caching Strategy**: Implement caching for frequently accessed data
- **CDN Optimization**: Optimize image and asset delivery

## 🔗 Related Documentation

- **[Environment Configuration](./environment.md)** - Monitoring environment setup
- **[Hosting](./hosting.md)** - Platform-specific monitoring
- **[Performance](../technical/performance.md)** - Performance monitoring strategies
- **[Security](../technical/security.md)** - Security monitoring and alerting

---

*Comprehensive monitoring ensures reliable application performance and provides insights for continuous improvement. Regular review and optimization of monitoring systems is essential for production success.* 
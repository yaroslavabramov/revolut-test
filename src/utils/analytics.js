import Analytics from 'analytics';
import googleAnalyticsPlugin from '@analytics/google-analytics';

export const analytics = Analytics({
  app: 'my-app-name',
  version: 1,
  plugins: [
    googleAnalyticsPlugin({
      trackingId: 'UA-164609686-1'
    })
  ]
});

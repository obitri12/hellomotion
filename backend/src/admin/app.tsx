import type { StrapiApp } from '@strapi/strapi/admin';
import { ChartBubble } from '@strapi/icons';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    app.addMenuLink({
      to: '/plugins/analytics',
      icon: ChartBubble,
      intlLabel: {
        id: 'app.analytics',
        defaultMessage: 'Analytics',
      },
      Component: () => import('./pages/Analytics'),
    });
  },
};

import { type StrapiApp } from '@strapi/strapi/admin';
import { BarChart } from '@strapi/icons';

export default {
  register(app: StrapiApp) {
    app.addMenuLink({
      to: '/plugins/analytics',
      icon: BarChart,
      intlLabel: {
        id: 'analytics.plugin.name',
        defaultMessage: 'Analytics',
      },
      Component: () => import('./pages/Analytics'),
    });
  },
};

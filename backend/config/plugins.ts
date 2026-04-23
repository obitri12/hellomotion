import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  analytics: {
    enabled: true,
    resolve: './src/plugins/analytics',
  },
});

export default config;

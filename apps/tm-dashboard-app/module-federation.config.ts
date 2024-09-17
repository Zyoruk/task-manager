import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tm-dashboard-app',
  exposes: {
    './Routes': 'apps/tm-dashboard-app/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;

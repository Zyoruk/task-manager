import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tm-tasks-app',
  exposes: {
    './Routes': 'apps/tm-tasks-app/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;

import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tm-settings-app',
  exposes: {
    './Routes': 'apps/tm-settings-app/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;

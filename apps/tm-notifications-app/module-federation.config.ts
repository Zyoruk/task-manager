import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tm-notifications-app',
  exposes: {
    './Routes':
      'apps/tm-notifications-app/src/app/remote-entry/entry.routes.ts',
    './ToastMessage':
      'apps/tm-notifications-app/src/app/components/tm-toast-message/tm-toast-message.component.ts',
  },
};

export default config;

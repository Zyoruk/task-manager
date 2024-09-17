import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tm-tasks-app',
  exposes: {
    './Routes': 'apps/tm-tasks-app/src/app/remote-entry/entry.routes.ts',
    './Board':
      'apps/tm-tasks-app/src/app/components/tm-board/tm-board.component.ts'
  },
};

export default config;

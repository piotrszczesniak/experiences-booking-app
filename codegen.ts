import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://bumperball.pl/graphql',
  documents: 'graphql/*.ts',
  generates: {
    'generated/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        skipTypename: false,
      },
    },
  },
};

export default config;

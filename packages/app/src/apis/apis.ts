import { AnyApiFactory, createApiFactory } from '@backstage/core';
import { configSchemaApiRef } from '@backstage/plugin-config-schema';
import { FragmentSchemaSource } from './FragmentSchemaSource';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: configSchemaApiRef,
    deps: {},
    factory: () => new FragmentSchemaSource(),
  }),
];

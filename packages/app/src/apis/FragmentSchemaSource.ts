import { ConfigSchemaApi } from '@backstage/plugin-config-schema';
import ObservableImpl from 'zen-observable';

export class FragmentSchemaSource implements ConfigSchemaApi {
  schema$: ConfigSchemaApi['schema$'] = () => {
    return new ObservableImpl(subscriber => {
      const { hash } = location;
      if (!hash) {
        subscriber.next({ schema: undefined });
        return;
      }
      if (!hash.startsWith('#schema=')) {
        subscriber.error(new Error('Configuration schema fragment is invalid'));
        return;
      }
      let schemaJson = hash.slice('#schema='.length);
      if (!schemaJson.startsWith('{')) {
        schemaJson = decodeURIComponent(schemaJson);
      }

      try {
        const schema = JSON.parse(schemaJson);
        subscriber.next({ schema });
      } catch (error) {
        subscriber.error(
          new Error(`Failed to parse configuration schema, ${error}`),
        );
      }
    });
  };
}

import Method from '@/Method';
import { getContext, newInstance, objAssign } from '@alova/shared/function';
import { AlovaGenerics } from '~/typings';

export default <AG extends AlovaGenerics>(methodInstance: Method<AG>) => {
  const { data, config } = methodInstance;
  const newConfig = { ...config };
  const { headers = {}, params = {} } = newConfig;
  const ctx = getContext(methodInstance);
  newConfig.headers = { ...headers };
  newConfig.params = { ...params };
  const newMethod = newInstance(Method<AG>, methodInstance.type, ctx, methodInstance.url, newConfig, data);
  return objAssign(newMethod, {
    ...methodInstance,
    config: newConfig
  });
};

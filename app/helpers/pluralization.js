import { helper } from '@ember/component/helper';

export default helper(function pluralization([value, ...rest]) {
  return value === 1 ? 'item' : 'items';
});

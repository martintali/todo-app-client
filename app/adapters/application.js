import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://api.todoapp.test',
  namespace: 'api/v1',
});

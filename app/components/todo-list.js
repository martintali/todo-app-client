import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
  store: service(),
  todos: null,
  actions: {
    createOne(title) {
      if (!title.trim()) { return; }

      var todo = this.get('store').createRecord('task', {
        name: title,
        completed: false
      });

      this.set('newTitle', '');
      todo.save();
    },
    toggleCompleted(task) {
      task.set('completed', !task.get('completed'));
      task.save();
    },
    delete(task) {
      task.destroyRecord();
    }
  },
  remaining: computed('todos.@each.completed', function() {
    let todos = this.get('todos');
    return todos.filterBy('completed', false).length;
  }),
  inflection: computed('remaining', function() {
    return this.get('remaining') === 1 ? 'item' : 'items';
  })
});

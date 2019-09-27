import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
  store: service(),
  todos: null,
  newTitle:'',
  actions: {
    createOne(e) {
      if (e.keyCode === 13 && !isBlank(e.target.value)) {
        const title = e.target.value;
        if (!title.trim()) { return; }

        var todo = this.get('store').createRecord('task', {
          name: title,
          completed: false
        });

        todo.save();
        e.target.value = '';
      }
    },
    toggleCompleted(task) {
      task.set('completed', !task.get('completed'));
      task.save();
    },
    editTask(task, e) {
      if (e.keyCode === 13 && !isBlank(e.target.value)) {
        task.set('name', e.target.value);
        task.save();
        task.set('isEditing', false);
        e.target.value = '';
      }
    },
    delete(task) {
      task.destroyRecord();
    },
    editTodo(task) {
      task.set('isEditing', !task.get('isEditing'));
    }
  },
  remaining: computed('todos.@each.completed', function() {
    let todos = this.get('todos');
    return todos.filterBy('completed', false).length;
  }),
  completed: computed('todos.@each.completed', function() {
    let todos = this.get('todos');
    return todos.filterBy('completed', true).length;
  }),
  total: computed('todos.@each', function() {
    let todos = this.get('todos');
    return todos.length;
  }),
});

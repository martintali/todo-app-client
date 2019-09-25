import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        createOne(title) {
            if (!title.trim()) { return; }

            var todo = this.store.createRecord('task', {
                name: title,
                completed: false
            });

            this.set('newTitle', '');
            let self = this;
            todo.save();
        },
        toggleCompleted(task) {
            task.set('completed', !task.get('completed'));
            task.save();
        },
        delete(task) {
            task.destroyRecord();
        }
    }
});

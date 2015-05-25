tasks = [
  { completed: true,  description: 'Add a task' },
  { completed: false, description: 'Add some more tasks' },
  { completed: false, description: 'Solve P = NP' }
];

ractive = new Ractive({
  el: 'container',
  template: '#my-template',
  data: { 
    name: 'Dave', 
    tasks: tasks,
    incomplete: function ( item ) {
      return !item.completed;
    }
  }
});

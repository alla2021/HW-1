const notes = [
   { 
      id: 1, 
      name: 'Shopping List', 
      created: 'May 22, 2023', 
      content: 'Sample note 1 with date 3/6/2023', 
      category: 1, 
      active: true, 
   },
   { 
      id: 2, name: 'Random Thought 1', 
      created: 'May 23, 2023', 
      content: 'This is a random thought with date 4/7/2023', 
      category: 3, 
      active: true, 
   },
   { 
      id: 3, 
      name: 'Idea 1', 
      created: 'May 24, 2023', 
      content: 'I had an idea on 7/15/2023', 
      category: 2, 
      active: true, 
   },
   { 
      id: 4, 
      name: 'Idea 12', 
      created: 'May 27, 2023', 
      content: 'Brilliant idea', 
      category: 2, 
      active: true, 
   },
   { 
      id: 5, 
      name: 'Task 2', 
      created: 'May 28, 2023', 
      content: 'Urgent task on 12/25/2023 and 12/31/2023e', 
      category: 1, 
      active: false, },
   { 
      id: 6, 
      name: 'The Theory Of Evolution',
      created: 'May 29, 2023', 
      content: 'Learn new info', 
      category: 3, 
      active: true, },
   { 
      id: 7, 
      name: 'Random Thought 2', 
      created: 'May 30, 2023',
      content: 'Brilliant idea', 
      category: 2, 
      active: true, },
]

const categories = [
   { 
      id: 1, 
      name: 'Task', 
      icon: 'local_grocery_store', 
   },
   { 
      id: 2, 
      name: 'Idea', 
      icon: 'lightbulb_outline',
   },
   { 
      id: 3, 
      name: 'Random Thought', 
      icon: 'help_outline',
   },
 ];
 

export { notes, categories };
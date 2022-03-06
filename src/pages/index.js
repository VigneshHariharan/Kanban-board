// drag and drop based on status
// for now 4 status - todo, inprogress, review, done. - should be scalable
// title, description, priority (p1,p2,p0)
// data and assign them in respective column
// in each column we need an order to maintain the order in each column
// 1. CREATE, READ
// 2. Draw column depending upon status
// 3. Modify, DELETE
// 4. Column Drag and drop
// 5. Order drag and drop
// 6. Styling overall

// Data structure -
// {
//     id: Number,
//     title: string,
//     description?: string,
//     priority?: 'p0', 'p1', 'p2',
//     order: Number, (self incremental),
//     status: todo, inprogress, review, done,
// }

import { TasksApiModel, tasksApi } from './model';
import { TasksController } from './controller';

const tasksModel = new TasksApiModel();
tasksModel.fetchTasks()?.then((tasks) => {
    const tasksController = new TasksController(tasksModel?.getTasks())
    tasksController.createBoard();
})?.catch((error) => {
    console.log('error : ',error)
});





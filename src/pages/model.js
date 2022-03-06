const API_URL = 'http://localhost:3001';
export const tasksApi = `${API_URL}/tasks`;

export class TasksApiModel {
    constructor(){
        this.tasks = {}
    };

    getTasks(){
        return this.tasks;
    }

    updateTasksFromServer(tasks){
        if(!tasks) return;


        console.log('tasks',tasks)
        tasks.forEach((task) => {
            if(!this.tasks[task.status]) {
                this.tasks[task.status] = [];
            }
            this.tasks[task.status] = [...this.tasks[task.status], task];
        });

        Object.entries(this.tasks)?.forEach(([status, tasks]) => {
            this.tasks[status] = this.tasks[status]?.sort((taskA, taskB) => taskA.order - taskB.order);
        });
    }

    async fetchTasks(){

        const response = await fetch(tasksApi);


        const tasks = await response.json();

        this.updateTasksFromServer(tasks?.data);
        return tasks.data;
    };

    async deleteTasks(taskId) {
        await fetch({ method:'DELETE', body: { taskId } })
    }
}


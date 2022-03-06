export class TasksController{
    constructor(tasks = {}){
        this.tasks = tasks;
    };

    createColumn(status){
        // Elements Created
        const statusWrapper = document.createElement('div');
        const statusDropArea = document.createElement('div');
        statusWrapper.classList.add('statusWrapper');
        statusDropArea.classList.add('statusDropArea');
        statusWrapper.setAttribute('id',status + 'Column');
        statusDropArea.setAttribute('id',status + 'DropArea');
        const statusText = document.createElement('h5');
        statusText.textContent = status?.toUpperCase();

        // // Elements Styling
        // statusWrapper.style = { height: '100%', minHeight: '300px', maxHeight: '600px', backgroundColor: 'gray',padding: '4px 8px' }
        // statusDropArea.style = { height: '100%',backgroundColor: 'white' }

        // Elements Organised
        statusWrapper.appendChild(statusText);
        statusWrapper.appendChild(statusDropArea);   

        return statusWrapper;
    }

    createColumns(){
        // data
        const allTasksStatusType = Object.keys(this.tasks);

        // all column view creation
        const allColumnView = document.createDocumentFragment();
        // TODO: order status
        allTasksStatusType?.forEach(status => {
            const statusColumnView = this.createColumn(status);
            allColumnView.appendChild(statusColumnView);
        });

        return allColumnView;
    };

    createTaskView(task){
        // element creation
        const taskWrapper = document.createElement('div');
        taskWrapper.setAttribute('id',`task_${task.id}`);

        const titleElement = document.createElement('h6');
        titleElement.textContent = task.title;
        const desElement = document.createElement('p');
        desElement.textContent = task.description;

        const priorityElement = document.createElement('p');
        priorityElement.textContent = task.priority;

        // element organisation
        taskWrapper.appendChild(titleElement);
        taskWrapper.appendChild(desElement);
        taskWrapper.appendChild(priorityElement);
   
        return taskWrapper;
    }

    appendDataToColumns(){
        // data
        const allTasksStatusType = Object.keys(this.tasks);
        
        // Add Task View all status column
        allTasksStatusType?.forEach((taskStatus) => {
            // TODO set getter for id elements
            const statusAreaElement = document.getElementById(`${taskStatus}DropArea`);
            this.tasks[taskStatus]?.forEach((task) => {
                const taskElement = this.createTaskView(task);
                statusAreaElement?.appendChild(taskElement)
            });
        });
    };

    createBoard(){
        const columnsView = this.createColumns();
        const boardView = document.querySelector('#board');
        boardView?.appendChild(columnsView);
        this.appendDataToColumns();
    }

};



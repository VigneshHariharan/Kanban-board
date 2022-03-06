const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors())

class TaskModel {
    constructor(){
        this.tasks = [];
    };

    updateTasksFromFile(){
        const file = JSON.parse(fs.readFileSync('data.json'));
        console.log('file',file)
        this.tasks = file?.data?.tasks;
    }

    updateFileWithTasks(){
        const data = JSON.stringify({ data: { tasks: this.tasks } })
        fs.writeFileSync('data.json',data);
    }

    getTasks(){
        return this.tasks;
    };

    addTask(task){
        this.tasks.push(task);
        this.updateFileWithTasks();
    };

    deleteTask(taskId){
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.updateFileWithTasks();
    };

    editTask(modifiedTask){
        let modifiedTaskIndex = this.tasks.findIndex((task) => task.id === modifiedTask.id);
        this.tasks[modifiedTaskIndex] = modifiedTaskIndex;
        this.updateFileWithTasks();
    }
};

const tasks = new TaskModel();
tasks.updateTasksFromFile();

app.get("/tasks",(req,res) => {
    res.send({ data: tasks.getTasks()});
});

app.post("/tasks",(req,res) => {
    const task = req.body.task;
    tasks.addTask(task);

    tasks.updateFileWithTasks();
    res.send({ data: task })
})


app.put("/tasks",(req,res) => {
    const task = req.body.task;
    tasks.editTask(task);
    res.send({ data: task })        
})

app.delete("/tasks",(req,res) => {
    const taskId = req.body.taskId;
    tasks.deleteTask(taskId);
    res.send({ data: task })

});

app.listen(3001,() => {
    console.log('server listening on 3001')
});
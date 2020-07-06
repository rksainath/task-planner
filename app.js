const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners

loadEventListeners()

// function for loading all the event listeners

function loadEventListeners() {
    // Load the DOM from local storage
    document.addEventListener('DOMContentLoaded', getTasks)

    // Add Task Event
    form.addEventListener('submit', addTask)

    // Remove Task Event
    taskList.addEventListener('click', removeTask)

    // Clear all the Tasks
    clearBtn.addEventListener('click', clearTasks)

    // Filter the Tasks
    filter.addEventListener('keyup', filterTasks)

}

// function for adding the task

function addTask(e) {
    if (taskInput.value === '') {
        alert('You should add at least one task.')
    }
    else {
        // create a list element to add the new task 
        const li = document.createElement('li')
        li.className = "collection-item"

        // create a textnode and append it to the  list element
        li.appendChild(document.createTextNode(taskInput.value))

        // create a link to delete the task and append it to list
        const link = document.createElement('a')
        // add a class name to link
        link.className = 'delete-item secondary-content'
        // add a design from fontawesome

        link.innerHTML = '<i class="fa fa-remove"></i>'
        // add the link to li
        li.appendChild(link)
        // add the list to parent collection
        taskList.appendChild(li)
        // clear the new task field once the task is added

        // persist to local storage
        storeToLocalStorage(taskInput.value)

        taskInput.value = ''
    }
    e.preventDefault()
}
function getTasks() {

    let tasks

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))

    }
    tasks.forEach(function (task) {
        // create a list element to add the new task 
        const li = document.createElement('li')

        // create a class name for the collection     
        li.className = "collection-item"

        // create a textnode and append it to the  list element
        li.appendChild(document.createTextNode(task))

        // create a link to delete the task and append it to list
        const link = document.createElement('a')

        // add a class name to link
        link.className = 'delete-item secondary-content'

        // add a design from fontawesome
        link.innerHTML = '<i class="fa fa-remove"></i>'

        // add the link to li
        li.appendChild(link)

        // add the list to parent collection
        taskList.appendChild(li)

    })

}
function storeToLocalStorage(task) {
    let tasks

    //check if there is any task existing in the local storage else set to empty
    // if tasks are present parse it using json and push the new task to the tasks

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))

    }
    tasks.push(task)

    // convert to string and set to local storage

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
    // remove task from list
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            // remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }

    e.preventDefault()
}

function clearTasks(e) {
    // clear all the task
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        // clear task from local storage
        clearTasksFromLocalStorage()
    }
    e.preventDefault()
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    //  take the text inputs and search for the text from the task collection
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'
            }
            else {
                task.style.display = 'none'
            }
        }
    )
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))

    }
    // iterate through the list of tasks and compare the text content, if it is equal then remove the items from
    // local storage
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasksFromLocalStorage() {
    // clear the local storage
    localStorage.clear()
}
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.pending-collection')
const taskListComplete = document.querySelector('.completed-collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const taskPlanner = document.querySelector('.card-action')
// Load all event listeners

loadEventListeners()

// function for loading all the event listeners

function loadEventListeners() {
    // Load the DOM from local storage
    document.addEventListener('DOMContentLoaded', getPendingTasks)

    document.addEventListener('DOMContentLoaded', getCompletedTasks)

    // Add Task Event
    form.addEventListener('submit', addTask)

    // Remove Task Event
    taskList.addEventListener('click', removeTaskFromPending)

    taskList.addEventListener('click', moveTaskToCompleted)

    taskListComplete.addEventListener('click', moveTaskToPending)

    taskListComplete.addEventListener('click', removeTaskFromCompleted)

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
        li.className = "collection-item white-text"

        const done = document.createElement('a')

        done.className = 'pending-item primary-content'

        done.innerHTML = '<i class="fa fa-check"></i>'
        li.appendChild(done)

        // create a textnode and append it to the  list element
        li.appendChild(document.createTextNode(taskInput.value))

        // create a link to delete the task and append it to list
        const link = document.createElement('a')
        // add a class name to link
        link.className = 'delete-item secondary-content'
        // add a design from fontawesome
        link.innerHTML = '<i class="fa fa-trash"></i>'


        // add the link to li
        li.appendChild(link)
        // add the list to parent collection
        taskList.appendChild(li)
        // console.log(taskList)
        // clear the new task field once the task is added

        // persist to local storage
        storeToLocalStoragePending(taskInput.value)

        taskPlanner.style.display = 'block'

        taskInput.value = ''

    }
    e.preventDefault()
}
function getPendingTasks(e) {

    let tasks

    if (localStorage.getItem('pending') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('pending'))
        taskPlanner.style.display = 'block'
    }
    tasks.forEach(function (task) {
        // create a list element to add the new task 
        const li = document.createElement('li')

        li.className = "collection-item white-text"

        const done = document.createElement('a')

        done.className = 'pending-item primary-content'

        done.innerHTML = '<i class="fa fa-check"></i>'
        li.appendChild(done)

        // create a class name for the collection     
        li.className = "collection-item white-text"

        // create a textnode and append it to the  list element
        li.appendChild(document.createTextNode(task))

        // create a link to delete the task and append it to list
        const link = document.createElement('a')

        // add a class name to link
        link.className = 'delete-item secondary-content'

        // add a design from fontawesome
        link.innerHTML = '<i class="fa fa-trash"></i>'

        // add the link to li
        li.appendChild(link)

        // add the list to parent collection
        taskList.appendChild(li)

    }) 


    e.preventDefault()

}

function getCompletedTasks(e) {

    let tasks

    if (localStorage.getItem('completed') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('completed'))
        taskPlanner.style.display = 'block'
    }
    tasks.forEach(function (task) {
        // create a list element to add the new task 
        const li = document.createElement('li')

        li.className = "collection-item white-text"

        const done = document.createElement('a')

        done.className = 'done-item primary-content'

        done.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(done)

        // create a class name for the collection     
        li.className = "collection-item white-text"

        // create a textnode and append it to the  list element
        li.appendChild(document.createTextNode(task))

        // create a link to delete the task and append it to list
        const link = document.createElement('a')

        // add a class name to link
        link.className = 'delete-item secondary-content'

        // add a design from fontawesome
        link.innerHTML = '<i class="fa fa-trash"></i>'

        // add the link to li
        li.appendChild(link)

        // add the list to parent collection
        taskListComplete.appendChild(li)

    }) 


    e.preventDefault()

}

function storeToLocalStoragePending(task) {
    let tasks

    //check if there is any task existing in the local storage else set to empty
    // if tasks are present parse it using json and push the new task to the tasks

    if (localStorage.getItem('pending') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('pending'))

    }
    tasks.push(task)

    // convert to string and set to local storage

    localStorage.setItem('pending', JSON.stringify(tasks))
}

function storeToLocalStorageCompleted(task) {
    let tasks

    //check if there is any task existing in the local storage else set to empty
    // if tasks are present parse it using json and push the new task to the tasks

    if (localStorage.getItem('completed') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('completed'))

    }
    tasks.push(task)

    // convert to string and set to local storage

    localStorage.setItem('completed', JSON.stringify(tasks))
}

function removeTaskFromPending(e) {
    // remove task from list
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            // remove task from local storage
            removeTaskFromLocalStoragePending(e.target.parentElement.parentElement)
        }
    }

    e.preventDefault()
}

function removeTaskFromCompleted(e) {
    // remove task from list
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            // remove task from local storage
            removeTaskFromLocalStorageCompleted(e.target.parentElement.parentElement)
    
        }
    }

    e.preventDefault()
}

function moveTaskToCompleted(e) {
    if (e.target.parentElement.classList.contains('pending-item')) {
        e.target.parentElement.className = 'done-item primary-content'
        e.target.className = 'fa fa-remove'
        const itemToMove = e.target.parentElement.parentElement
        taskListComplete.appendChild(itemToMove)
        // console.log(e.target.parentElement.parentElement.textContent)
        storeToLocalStorageCompleted(e.target.parentElement.parentElement.textContent)
        removeTaskFromLocalStoragePending(e.target.parentElement.parentElement)

    }

    e.preventDefault()
}

function moveTaskToPending(e) {
    if (e.target.parentElement.classList.contains('done-item')) {
        e.target.parentElement.className = 'pending-item primary-content'
        e.target.className = 'fa fa-check'
        const itemToMove = e.target.parentElement.parentElement
        taskList.appendChild(itemToMove)
        // console.log(e.target.textContent)
        storeToLocalStoragePending(e.target.parentElement.parentElement.textContent)
        removeTaskFromLocalStorageCompleted(e.target.parentElement.parentElement)

    }

    e.preventDefault()
}

function clearTasks(e) {
    // clear all the task
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
            // clear task from local storage
        }
        while (taskListComplete.firstChild) {
            taskListComplete.removeChild(taskListComplete.firstChild)
            // clear task from local storage
        }
        clearTasksFromLocalStorage()
        taskPlanner.style.display = 'none'
    }

    e.preventDefault()
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    //  take the text inputs and search for the text from the task collection
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            // const item = task.firstChild.textContent
            const item = task.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                // taskPlanner.style.display = 'block'
                task.style.display = 'block'
            }
            else {
                task.style.display = 'none'
            }
        }
    )
}

function removeTaskFromLocalStoragePending(taskItem) {
    let tasks

    if (localStorage.getItem('pending') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('pending'))

    }
    // iterate through the list of tasks and compare the text content, if it is equal then remove the items from
    // local storage
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('pending', JSON.stringify(tasks))
}

function removeTaskFromLocalStorageCompleted(taskItem) {
    let tasks

    if (localStorage.getItem('completed') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('completed'))

    }
    // iterate through the list of tasks and compare the text content, if it is equal then remove the items from
    // local storage
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('completed', JSON.stringify(tasks))
}

function clearTasksFromLocalStorage() {
    // clear the local storage

    localStorage.clear()
}
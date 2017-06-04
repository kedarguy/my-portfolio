var KEY_TODOS = 'todos';

console.log('Todos!');

var gState = getInitialState();


function getInitialState() {
    var state = loadFromStorage(KEY_TODOS);
    if (!state) {
        state = {
            todos: getInitialTodos(),
            archivedTodos: [],
            nextId: 3
        }
    }
    return state;
}

function init() {
    renderTodos(gState.todos);
}

function getInitialTodos() {
    var todos = [];
    todos.push(getTodo('Learn Javascript', 0));
    todos.push(getTodo('Practive HTML', 1));
    todos.push(getTodo('Master CSS', 2));
    return todos;
}

function getTodo(txt, id) {
    return { id: id, txt: txt, isDone: false }
}

function renderTodos(todos) {
    var elTodos = document.querySelector('.todos');

    var strHtmls = todos.map(function (todo) {
        var strChecked = (todo.isDone) ? ' checked ' : '';
        return `<li>
                    <input type="checkbox" id="c${todo.id}" ${strChecked} onchange="todoClicked(${todo.id})" />
                    <label for="c${todo.id}"><span></span>${todo.txt}</label>
                </li>`
    });

    elTodos.innerHTML = strHtmls.join('');
}

function todoClicked(id) {
    var todo = gState.todos.find(function (todo) {
        return todo.id === id
    });
    
    todo.isDone = !todo.isDone;

    saveToStorage(KEY_TODOS, gState);
}

function archiveDone() {
    gState.todos = gState.todos.filter(function (todo) {
        if (todo.isDone) gState.archivedTodos.push(todo);
        return !todo.isDone;
    })
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function addTodo() {
    var txt = prompt('New Todo');
    var todo = getTodo(txt, gState.nextId);
    gState.nextId++
    gState.todos.push(todo);
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function setFilter(event) {
    if (event.target.value) {
        var selectedFilter = event.target.value;
        var todos;
        switch (selectedFilter) {
            case 'active':
                todos = gState.todos
                break;
            case 'archived':
                todos = gState.archivedTodos
                break;
            case 'all':
                todos = gState.todos.concat(gState.archivedTodos);
                break;

        }
        renderTodos(todos);
    }
}
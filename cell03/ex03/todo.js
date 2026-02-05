const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = function() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const tasks = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        tasks.reverse().forEach(task => addTask(task, false));
    }
};

newBtn.addEventListener('click', () => {
    const taskText = prompt("Enter a new TO DO:");
    if (taskText && taskText.trim() !== "") {
        addTask(taskText, true);
    }
});

function addTask(text, save) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;

    div.addEventListener('click', () => {
        if (confirm("Do you really want to remove this TO DO?")) {
            div.remove();
            saveToCookies();
        }
    });

    ftList.prepend(div);

    if (save) saveToCookies();
}

function saveToCookies() {
    const tasks = [];
    const items = ftList.querySelectorAll('.todo-item');
    items.forEach(item => tasks.push(item.textContent));
    
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; expires=" + expiry.toUTCString() + "; path=/";
}
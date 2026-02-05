$(document).ready(function() {
    const $list = $('#ft_list');

    const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (cookie) {
        try {
            const tasks = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
            tasks.reverse().forEach(t => addTask(t, false));
        } catch (e) {
            console.error("Cookie parsing error:", e);
        }
    }

    $('#new_btn').on('click', function() {
        const txt = prompt("New TO DO:");
        if (txt && txt.trim()) {
            addTask(txt, true);
        }
    });

    function addTask(txt, shouldSave) {
        const $item = $('<div></div>').addClass('todo-item').text(txt);
        
        $item.on('click', function() {
            if (confirm("Remove this item?")) {
                $(this).remove();
                save();
            }
        });

        $list.prepend($item);
        if (shouldSave) save();
    }

    function save() {
        const tasks = $('.todo-item').map(function() { 
            return $(this).text(); 
        }).get();
        
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; max-age=604800";
    }
});
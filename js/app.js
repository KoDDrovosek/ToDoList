$(document).ready(function() {
    // adding modal
    let tasksList = [];
    $('.modal').modal();
    $('select').material_select();

    let jsonTaskList = JSON.parse(localStorage.getItem("tasks"));

    function addCard(idParam, nameParam, descriptionParam) {
        let newCard = `
        <div class="card teal darken-1" id="${idParam}">
            <div class="card-content white-text">
                <span class="card-title">${nameParam}</span>
                <p>${descriptionParam}</p>
            </div>
            <div class="card-action">
                <a href="#" class="white-text" id="bt_done">done</a>
                <a href="#" class="white-text" id="bt_delete">delete</a>
            </div>
        </div>`;
        return newCard;
    };

    function openLocal() {
        jsonTaskList.forEach(function(item) {
            tasksList.push(item);
            if (item.taskStatus === false) {
                $('#need_to_do').append(addCard(item.idNum, item.taskName, item.taskDescription));
            } else {
                $('#done').append(addCard(item.idNum, item.taskName, item.taskDescription));
                $(`#${item.idNum}`).removeClass('teal darken-1');
                $(`#${item.idNum}`).addClass('#ffc107 amber');
                $('#bt_done').attr('disabled', true);
                $('#bt_done').removeClass('white-text');
                $('#bt_done').addClass('transparent');
            }

        });

    };

    function saveType() {
        if ($('#save_type').val() === 'click_save') {
            $('#bt_save').removeAttr('disabled');
        } else if ($('#save_type').val() === 'auto_save') {
            $('#bt_save').attr('disabled', true);
            localStorage.setItem("tasks", JSON.stringify(tasksList));
        } else {
            $('#bt_save').attr('disabled', true);
            localStorage.setItem("tasks", JSON.stringify(tasksList));
        };
    };



    if (jsonTaskList !== null) {
        openLocal();
    }
    $('#bt_add').bind('click', function(e) {
        e.preventDefault();
        $('.modal').modal('open');
    });
    $('#task_name, #task_description').on('keyup', function() {


        if ($('#task_name').val() === '' && $('#task_description').val() === '') {
            $('#bt_add_task').attr("disabled", "");

        } else {
            $('#bt_add_task').removeAttr("disabled");
        };

    });

    $('#bt_add_task').bind('click', () => {
        let task = {
            idNum: '',
            taskName: $('#task_name:input').val(),
            taskDescription: $('#task_description').val(),
            taskStatus: false
        };

        let randomID = Math.floor(Math.random() * 10000000);
        task.idNum = randomID;
        tasksList.push(task);
        $('#need_to_do').append(addCard(task.idNum, task.taskName, task.taskDescription));
        $('#task_name').val('');
        $('#task_description').val('');
        $('.modal').modal('close');
        $('#bt_add_task').attr("disabled", "");
        saveType();
    });

    $('#need_to_do').on('click', '#bt_done', function() {
        let a = $(this).closest('.card').attr('id');
        this.closest('.card').remove();
        $('#done').append($(this).closest('.card'));
        console.log($(this));

        tasksList.forEach(function(item) {
            console.log(typeof a);

            if (parseInt(a) === item.idNum) {
                $(`#${item.idNum}`).removeClass('teal darken-1');
                $(`#${item.idNum}`).addClass('#ffc107 amber');
                item.taskStatus = true;
                saveType();
                console.log(item);
            };

        });
    });

    $('#bt_cancel').bind('click', function() {
        $('.modal').modal('close');
    });

    $('#need_to_do,#done').on('click', '#bt_delete', function(e) {
        e.preventDefault();
        let a = $(this).closest('.card').attr('id');
        this.closest('.card').remove();

        tasksList.forEach(function(item, index) {
            console.log(typeof a);

            if (parseInt(a) === item.idNum) {
                tasksList.splice(index);
                console.log(tasksList);
                saveType();

            };

        });
    });

    $('#save_type').bind('change', function() {
        saveType();
        console.log(saveType());
    });

    $('#bt_save').bind('click', function(e) {
        e.preventDefault();
        localStorage.setItem("tasks", JSON.stringify(tasksList));
    });

});
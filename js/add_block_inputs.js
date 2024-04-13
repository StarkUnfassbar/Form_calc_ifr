let buttonsAdd = document.querySelectorAll(".button_add_block_inputs");



buttonsAdd.forEach(buttonAdd => {
    buttonAdd.addEventListener("click", (e) => {
        e.preventDefault();

        let formBlock = buttonAdd.closest(".form_block");
        const blockInputsLength = formBlock.querySelectorAll(".block_inputs:not(.radio)").length
        let blockInputs = formBlock.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];

        if(
            !periodCheckChronology(formBlock) &&
            blockInputs.querySelectorAll(".block_select .select .select__head").length === 2 &&
            blockInputs.querySelectorAll(".block_select .select .select__head")[0].value != "" &&
            blockInputs.querySelectorAll(".block_select .select .select__head")[1].value != ""
        ){
            let newBlockInputs = blockInputs.cloneNode(true);


            let currentDate = blockInputs.querySelectorAll(".block_select .select .select__head")[1].value;
            let parts = currentDate.split('.');
            let day = parseInt(parts[0], 10);
            let month = parseInt(parts[1], 10);
            let year = parseInt(parts[2], 10);

            day++;
            let daysInMonth = new Date(year, month, 0).getDate();
            if (day > daysInMonth) {
                day = 1;
                month++;
            }

            newBlockInputs.insertAdjacentHTML("beforeend", `
                <a href="" class="button_delete">
                    <img src="img/period/icon_delete.svg" alt="">
                </a>
            `);

            deleteNewBlock(newBlockInputs.querySelectorAll(".button_delete")[newBlockInputs.querySelectorAll(".button_delete").length - 1]);

            let startDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;


            if(newBlockInputs.querySelector(".additional_check_mark")){
                newBlockInputs.querySelector(".additional_check_mark input").checked = false;
            }
            

            newBlockInputs.querySelectorAll("input")[0].value = startDate;
            newBlockInputs.querySelectorAll("input")[1].value = "";

            newBlockInputs.querySelectorAll(".select__calendar .calendar").forEach(calendar => {
                calendar.innerHTML = "";
            });
            newBlockInputs.insertAdjacentHTML("beforeend", `
                <p class="error_text">Отсутствует одна из дат</p>
            `);

            newBlockInputs.classList.add("_error");
            formBlock.insertAdjacentElement("beforeend", newBlockInputs);


            let selectsDate = newBlockInputs.querySelectorAll(".select.date");
            selectDateNew(selectsDate);
            buttonsAddCheckActive(selectsDate[0].closest(".form_block"));
        } else if(blockInputs.querySelector(".graph_year")){
            let newBlockInputs = blockInputs.cloneNode(true);

            newBlockInputs.querySelectorAll("input").forEach(input => {
                input.value = "0";
            });

            newBlockInputs.querySelector(".graph_year span").innerText = parseInt(newBlockInputs.querySelector(".graph_year span").innerText) + 1;

            formBlock.insertAdjacentElement("beforeend", newBlockInputs);
        }
    });
});



function selectInputsNew(selectInputs){
    selectInputs.forEach(selectInput => {
        let select = selectInput.closest(".select");
        let selectHeight = selectInput.closest(".block_select").offsetHeight;
    
        let cell = 0;
    
        let headerMonth = select.querySelector(".select__calendar .calenar__header");
        let container = select.querySelector(".select__calendar .calendar");
    
    
        const mask = new IMask(selectInput, {
            mask: "d0.m0.0000",
            lazy: false,
            blocks: {
                'd': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 3
                },
                'm': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 1
                },
                '0': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 9
                }
            }
        });
    
        selectInput.addEventListener('keydown', function(event) {
            if(event.key === 'Enter') {
                event.preventDefault();
                if(mask.unmaskedValue.length === 8) {
                    let today = new Date();
    
                    let minDateStr = (select.getAttribute('data-minvalue')).split(".");
                    let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);
                    
                    if(
                        new Date(mask.unmaskedValue.substr(4, 4), parseInt(mask.unmaskedValue.substr(2, 2)) - 1, parseInt(mask.unmaskedValue.substr(0, 2))) <= today &&
                        new Date(mask.unmaskedValue.substr(4, 4), parseInt(mask.unmaskedValue.substr(2, 2)) - 1, 1) >= minDate
                    ){
                        createCalendar(select, selectHeight, mask.unmaskedValue.substr(4, 4), parseInt(mask.unmaskedValue.substr(2, 2)) - 1, headerMonth, container, cell);
    
                        select.querySelectorAll("table td span").forEach(cell => {
                            if(
                                parseInt(cell.innerText) === parseInt(mask.unmaskedValue.substr(0, 2)) &&
                                !cell.closest(".button_open_audience").classList.contains("_no_active")
                            ){
                                cell.classList.add("_active");
                            }
                        });
        
                        let formBlocksError = []; 
                        formBlocksError.push(select.closest(".form_block"));
                        formBlockNecessarily(formBlocksError);
                    } else{
                        select.querySelector(".select__head").value = "";
                    }
                }
            }
        });
    });
}

function selectDateNew(selectsDate){
    selectsDate.forEach(select => {
        let selectHeight = select.closest(".block_select").offsetHeight;
        let selectChangeFunActive = false;
    
        let selectEvent = (e) => {
            if (e.target.closest(".select") === select && e.type == "touchstart"){
                selectChangeFunActive = true;
                if(!select.querySelector(".select__calendar .calendar table")){
                    selectDateChange(e.target.closest(".select"), selectHeight);
                } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
                    selectDateChange(e.target.closest(".select"), selectHeight);
                }
            } else if (e.target.closest(".select") === select && e.type == "click" && !selectChangeFunActive){
                if(!select.querySelector(".select__calendar .calendar table")){
                    selectDateChange(e.target.closest(".select"), selectHeight);
                } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
                    selectDateChange(e.target.closest(".select"), selectHeight);
                }
            }
        };
    
        select.addEventListener("touchstart", (e) => selectEvent(e));
        select.addEventListener("click", (e) => selectEvent(e));
    
        selectDateCheckActive(select, selectHeight);
        buttonsAddCheckActive(select.closest(".form_block"));
    });
};

function buttonsAddCheckActive(formBlock){
    if(formBlock.querySelector(".button_add_block_inputs")){
        let formBlockLenght = formBlock.querySelectorAll(".block_select").length;
        if(
            !periodCheckChronology(formBlock) &&
            formBlock.querySelectorAll(".block_select")[formBlockLenght - 1].querySelector(".select__head").value != "" &&
            formBlock.querySelectorAll(".block_select")[formBlockLenght - 2].querySelector(".select__head").value != ""
        ){
            formBlock.querySelector(".button_add_block_inputs").classList.add("_active");
        } else{
            formBlock.querySelector(".button_add_block_inputs").classList.remove("_active");   
        }
    }
};

function deleteNewBlock(buttonDeleteNewBlock){
    buttonDeleteNewBlock.addEventListener("click", (e) => {
        e.preventDefault();
        const blockInputs = buttonDeleteNewBlock.closest(".block_inputs");
        const formBlock = buttonDeleteNewBlock.closest(".form_block")
        formBlock.removeChild(blockInputs);

        buttonsAddCheckActive(formBlock);
    });
};
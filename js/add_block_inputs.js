let buttonsAdd = document.querySelectorAll(".button_add_block_inputs");



buttonsAdd.forEach(buttonAdd => {
    buttonAdd.addEventListener("click", (e) => {
        e.preventDefault();

        let formBlock = buttonAdd.closest(".form_block");
        const blockInputsLength = formBlock.querySelectorAll(".block_inputs:not(.radio)").length
        let blockInputs = formBlock.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];

        if(
            (formBlock.id === "period-1" || formBlock.id === "period-2" || formBlock.id === "period-3" ||
            formBlock.id === "period-4" || formBlock.id === "period-5") && !formBlock.querySelector(".block_inputs._error") &&
            blockInputs.querySelectorAll(".select .select__head")[0].value != "" &&
            blockInputs.querySelectorAll(".select .select__head")[1].value != ""
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

            // newBlockInputs.querySelectorAll(".select__calendar .calendar").forEach(calendar => {
            //     calendar.innerHTML = "";
            // });
            newBlockInputs.insertAdjacentHTML("beforeend", `
                <p class="error_text">Отсутствует одна из дат</p>
            `);

            newBlockInputs.classList.add("_error");
            formBlock.insertAdjacentElement("beforeend", newBlockInputs);


            let selectsDate = newBlockInputs.querySelectorAll(".select.date");
            let selectInputs = newBlockInputs.querySelectorAll(".select.date .select__head");
            selectDateNew(selectsDate);
            selectInputsNew(selectInputs);
            buttonsAddCheckActive(selectsDate[0].closest(".form_block"));
        } else if(blockInputs.querySelector(".graph_year")){
            if(parseInt(blockInputs.querySelector(".graph_year span").innerText) < new Date().getFullYear() - 1){
                let newBlockInputs = blockInputs.cloneNode(true);

                newBlockInputs.querySelectorAll("input").forEach(input => {
                    input.value = "0";
                });
    
                newBlockInputs.querySelector(".graph_year span").innerText = parseInt(newBlockInputs.querySelector(".graph_year span").innerText) + 1;
    
                formBlock.insertAdjacentElement("beforeend", newBlockInputs);
    
                let inputsLength = formBlock.querySelectorAll(".input_text input").length;
                inputNew(formBlock.querySelectorAll(".input_text input")[inputsLength - 1]);
            } else if(parseInt(blockInputs.querySelector(".graph_year span").innerText) == new Date().getFullYear() - 1){
                let newBlockInputs = blockInputs.cloneNode(true);

                newBlockInputs.querySelectorAll("input").forEach(input => {
                    input.value = "0";
                });
    
                newBlockInputs.querySelector(".graph_year span").innerText = parseInt(newBlockInputs.querySelector(".graph_year span").innerText) + 1;
    
                formBlock.insertAdjacentElement("beforeend", newBlockInputs);
    
                let inputsLength = formBlock.querySelectorAll(".input_text input").length;
                inputNew(formBlock.querySelectorAll(".input_text input")[inputsLength - 1]);

                formBlock.querySelector(".button_add_block_inputs").classList.remove("_active");
            }
        }
    });
});



function selectInputsNew(selectInputs){
    selectInputs.forEach(selectInput => {
        let select = selectInput.closest(".select");
    
        let previousValue = selectInput.value;
        selectInput.addEventListener('input', function(e) {
            let selectHeadStr = selectInput.value.replace(/\./g, '').replace(/_/g, '');
            let formattedValue = '';
    
    
            let currentValue = e.target.value;
            let lastChar = '';
            let сontinueReplacement = true;
    
            if(currentValue.length < previousValue.length) {
                if(selectHeadStr.length === 2){
                    selectInput.value = selectInput.value.slice(0, -1);
                    сontinueReplacement = false;
                } else if(selectHeadStr.length === 4){
                    selectInput.value = selectInput.value.slice(0, -1);
                    сontinueReplacement = false;
                }
            } else{
                lastChar = currentValue.slice(-1);
                const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];
                
                if(!allowedKeys.includes(lastChar)){
                    selectInput.value = selectInput.value.slice(0, -1);
                    сontinueReplacement = false;
                } else{
                    if(selectHeadStr.length === 1 && !(lastChar >= '0' && lastChar <= '3')) {
                        selectInput.value = selectInput.value.slice(0, -1);
                        сontinueReplacement = false;
                    }
            
                    if (selectHeadStr.length === 3 && !(lastChar >= '0' && lastChar <= '1')) {
                        selectInput.value = selectInput.value.slice(0, -1);
                        сontinueReplacement = false;
                    }
                }
            }
    
    
            if(сontinueReplacement){
                if (selectHeadStr.length < 2) {
                    formattedValue = selectHeadStr
                } else if (selectHeadStr.length < 4) {
                    formattedValue = selectHeadStr.substring(0, 2) + '.' + selectHeadStr.substring(2);
                } else {
                    let firstPart = selectHeadStr.substring(0, 2);
                    let secondPart = selectHeadStr.substring(2, 4);
                    let thirdPart = selectHeadStr.substring(4, 8)
                    formattedValue = `${firstPart}.${secondPart}.${thirdPart}`;
                }
                selectInput.value = formattedValue;
            }
    
            if(selectHeadStr.length == 8){
                selectHeadStr = selectHeadStr + e.key;
    
                let today = new Date();
        
                let minDateStr = (select.getAttribute('data-minvalue')).split(".");
                let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);
    
                const daysInMonth = parseInt((new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)), 0)).getDate());
    
                if(
                    parseInt(selectHeadStr.substr(4, 4)) === 0 ||
                    parseInt(selectHeadStr.substr(2, 2)) < 1 || parseInt(selectHeadStr.substr(2, 2)) > 12 ||
                    parseInt(selectHeadStr.substr(0, 2)) < 1 || parseInt(selectHeadStr.substr(0, 2)) > daysInMonth
                ){
                    select.querySelector(".select__head").value = "";
                } else if(
                    new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) - 1, parseInt(selectHeadStr.substr(0, 2))) > today ||
                    new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) - 1, 1) < minDate
                ){
                    select.querySelector(".select__head").value = "";
                }
    
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
            } else if(selectHeadStr.length == 6 && parseInt(selectHeadStr.substr(4, 2)) < 19 || parseInt(selectHeadStr.substr(4, 2)) > 20){
                select.querySelector(".select__head").value = "";
    
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
                buttonResultActive();
            } else if(selectHeadStr.length == 4 && parseInt(selectHeadStr.substr(2, 2)) < 1 || parseInt(selectHeadStr.substr(2, 2)) > 12){
                select.querySelector(".select__head").value = "";
    
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
            } else if(selectHeadStr.length == 2 && parseInt(selectHeadStr.substr(0, 2)) < 1 || parseInt(selectHeadStr.substr(0, 2)) > 31){
                select.querySelector(".select__head").value = "";
    
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
            } else if(selectHeadStr.length == 0){
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
            }
    
    
            previousValue = selectInput.value;
        });
    });
}

function selectDateNew(selectsDate){
    selectsDate.forEach(select => {
        let selectChangeFunActive = false;
    
        let selectEvent = (e) => {
            if (e.target.closest(".select") === select && e.type == "touchstart"){
                selectChangeFunActive = true;
                e.target.closest(".select").classList.add("_active");
            } else if (e.target.closest(".select") === select && e.type == "click" && !selectChangeFunActive){
                e.target.closest(".select").classList.add("_active");
            }
        };
    
        select.addEventListener("touchstart", (e) => selectEvent(e));
        select.addEventListener("click", (e) => selectEvent(e));
    
        selectDateCheckActive(select);
        buttonsAddCheckActive(select.closest(".form_block"));
    });
};

function buttonsAddCheckActive(formBlock){
    if(
        formBlock.querySelector(".button_add_block_inputs") && (formBlock.id === "period-1" || formBlock.id === "period-2" ||
        formBlock.id === "period-3" || formBlock.id === "period-4" || formBlock.id === "period-5")
    ){
        if(
            !formBlock.querySelector(".block_inputs._error") &&
            formBlock.querySelectorAll(".block_inputs .select .select__head")[formBlock.querySelectorAll(".block_inputs .select .select__head").length - 1].value != ""
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

        const formBlocksError = [];
        formBlocksError.push(formBlock);
        formBlockNecessarily(formBlocksError);
        buttonsAddCheckActive(formBlock);
        periodsChronology();
    });
};
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
            let selectInputs = newBlockInputs.querySelectorAll(".select.date .select__head");
            selectDateNew(selectsDate);
            selectInputsNew(selectInputs)
            buttonsAddCheckActive(selectsDate[0].closest(".form_block"));
        } else if(blockInputs.querySelector(".graph_year")){
            let newBlockInputs = blockInputs.cloneNode(true);

            newBlockInputs.querySelectorAll("input").forEach(input => {
                input.value = "0";
            });

            newBlockInputs.querySelector(".graph_year span").innerText = parseInt(newBlockInputs.querySelector(".graph_year span").innerText) + 1;

            formBlock.insertAdjacentElement("beforeend", newBlockInputs);

            let inputsLength = formBlock.querySelectorAll(".input_text input").length;
            inputNew(formBlock.querySelectorAll(".input_text input")[inputsLength - 1]);
        }
    });
});



function selectInputsNew(selectInputs){
    selectInputs.forEach(selectInput => {
        let select = selectInput.closest(".select");
    
        selectInput.addEventListener('keydown', function(e) {
            let selectHeadStr = selectInput.value.replace(/\./g, '').replace(/_/g, '');
            if (selectHeadStr.length >= 8 && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
    
            const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 'Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];
                
            if(!allowedKeys.includes(e.key)) {
                e.preventDefault();
            } else{
                if(selectHeadStr.length === 0 && !(e.key >= '0' && e.key <= '3')) {
                    e.preventDefault();
                }
        
                if (selectHeadStr.length === 2 && !(e.key >= '0' && e.key <= '1')) {
                    e.preventDefault();
                }
            }
    
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const cursorPosition = selectInput.selectionStart;
                const deletedCharacter = selectInput.value[cursorPosition - 1];
    
                if(deletedCharacter === '.'){
                    selectInput.value = selectInput.value.substring(0, cursorPosition - 2);
                    e.preventDefault();
                } else{
                    selectInput.value = selectInput.value.substring(0, cursorPosition);
                }
            }
    
            if(e.key === 'Enter') {
                e.preventDefault();
    
                const formBlocksError = [];
                formBlocksError.push(select.closest(".form_block"));
                formBlockNecessarily(formBlocksError);
                buttonsAddCheckActive(select.closest(".form_block"));
            }
        });
    
        selectInput.addEventListener('input', function(e) {
            let selectHeadStr = selectInput.value.replace(/\./g, '').replace(/_/g, '');
            let formattedValue = '';
    
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
        });
    });
}

function selectDateNew(selectsDate){
    // selectsDate.forEach(select => {
    //     let selectHeight = select.closest(".block_select").offsetHeight;
    //     let selectChangeFunActive = false;
    
    //     let selectEvent = (e) => {
    //         if (e.target.closest(".select") === select && e.type == "touchstart"){
    //             selectChangeFunActive = true;
    //             if(!select.querySelector(".select__calendar .calendar table")){
    //                 selectDateChange(e.target.closest(".select"), selectHeight);
    //             } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
    //                 selectDateChange(e.target.closest(".select"), selectHeight);
    //             }
    //         } else if (e.target.closest(".select") === select && e.type == "click" && !selectChangeFunActive){
    //             if(!select.querySelector(".select__calendar .calendar table")){
    //                 selectDateChange(e.target.closest(".select"), selectHeight);
    //             } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
    //                 selectDateChange(e.target.closest(".select"), selectHeight);
    //             }
    //         }
    //     };
    
    //     select.addEventListener("touchstart", (e) => selectEvent(e));
    //     select.addEventListener("click", (e) => selectEvent(e));
    
    //     selectDateCheckActive(select, selectHeight);
    //     buttonsAddCheckActive(select.closest(".form_block"));
    // });

    selectsDate.forEach(select => {
        let selectHeight = select.closest(".block_select").offsetHeight;
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
let period1 = document.querySelector("#period-1");
let period5 = document.querySelector("#period-5");
let period5ActiveHtml = `
    <div class="block_inputs">
        <div class="block_select">
            <label for="">C</label>
            <div class="select date" data-minvalue="01.01.1990">
                <input class="select__head" type="text" name="" id="" placeholder="__.__.____">
            </div>
        </div>

        <div class="block_select">
            <label for="">ПО</label>
            <div class="select date" data-minvalue="01.01.1990">
                <input class="select__head" type="text" name="" id="" placeholder="__.__.____">
            </div>
        </div>
    </div>

    <div class="button_add_block_inputs">
        <a href="">Добавить период</a>
    </div>
`;



period5.querySelectorAll(".block_inputs.radio .input_radio input").forEach(buttonRadio => {
    if(buttonRadio.value == "no"){
        buttonRadio.checked = true;
    }

    buttonRadio.addEventListener("click", () => {
        if(buttonRadio.value == "yes"){
            period5.insertAdjacentHTML("beforeend", period5ActiveHtml);
            period5.style.marginBottom = "35px";

            let selectsDate = period5.querySelectorAll(".select.date");
            let selectInputs = period5.querySelectorAll(".select.date .select__head");

            selectDateNew(selectsDate);
            selectInputsNew(selectInputs);
            buttonAddNew(period5.querySelector(".button_add_block_inputs"));
        } else{
            period5.querySelectorAll(".block_inputs:not(.radio)").forEach(blockInputs => {
                period5.removeChild(blockInputs);
            });

            period5.removeChild(period5.querySelector(".button_add_block_inputs"));

            period5.style.marginBottom = "0px";
        }
    });
});


function buttonAddNew(buttonAdd){
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
            selectInputsNew(selectInputs);
            buttonsAddCheckActive(selectsDate[0].closest(".form_block"));
        }
    });
};
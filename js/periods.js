let period1 = document.querySelector("#period-1");
let period5 = document.querySelector("#period-5");
let period5ActiveHtml = `
    <div class="block_inputs">
        <div class="block_select">
            <label for="">C</label>
            <div class="select date" data-minvalue="01.01.1990">
                <input class="select__head" type="text" name="" id="" placeholder="__.__.____">
                <div class="select__calendar">
                    <h5 class="calenar__header"></h6>

                    <div class="calendar">

                    </div>
                    
                    <a href="" class="calendar__arrow prev _active" title=""></a>
                    <a href="" class="calendar__arrow next" title=""></a>
                </div>
            </div>
        </div>

        <div class="block_select">
            <label for="">ПО</label>
            <div class="select date" data-minvalue="01.01.1990">
                <input class="select__head" type="text" name="" id="" placeholder="__.__.____">
                <div class="select__calendar">
                    <h5 class="calenar__header"></h6>

                    <div class="calendar">

                    </div>
                    
                    <a href="" class="calendar__arrow prev _active" title=""></a>
                    <a href="" class="calendar__arrow next" title=""></a>
                </div>
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



function periodCheck(period1, period2){
    let p1Length = period1.querySelectorAll(".block_inputs:not(.radio) .block_select").length;
    let p5Length = period2.querySelectorAll(".block_inputs:not(.radio) .block_select").length;

    if(
        period1.querySelector(".block_inputs:not(.radio) .block_select") &&
        period1.querySelectorAll(".block_inputs:not(.radio) .block_select")[0].querySelector(".select__head").value != "" &&
        period1.querySelectorAll(".block_inputs:not(.radio) .block_select")[p1Length - 1].querySelector(".select__head").value != "" &&
        period2.querySelector(".block_inputs:not(.radio) .block_select") &&
        period2.querySelectorAll(".block_inputs:not(.radio) .block_select")[0].querySelector(".select__head").value != "" &&
        period2.querySelectorAll(".block_inputs:not(.radio) .block_select")[p5Length - 1].querySelector(".select__head").value != ""
    ){
        let startDate1 = period1.querySelectorAll(".block_inputs:not(.radio) .block_select")[0].querySelector(".select__head").value
        startDate1 = new Date(startDate1.split('.').reverse().join('-'));
    
        let startDate2 = period2.querySelectorAll(".block_inputs:not(.radio) .block_select")[0].querySelector(".select__head").value
        startDate2 = new Date(startDate2.split('.').reverse().join('-'));
    
        let endDate1 = period1.querySelectorAll(".block_inputs:not(.radio) .block_select")[p1Length - 1].querySelector(".select__head").value;
        endDate1 = new Date(endDate1.split('.').reverse().join('-'))
    
        let endDate2 = period2.querySelectorAll(".block_inputs:not(.radio) .block_select")[p5Length - 1].querySelector(".select__head").value;
        endDate2 = new Date(endDate2.split('.').reverse().join('-'))
    
        if ((startDate1 <= endDate2 && startDate1 >= startDate2) || (startDate2 <= endDate1 && startDate2 >= startDate1)){
            return {period1: period1, period2: period2, intersect1: true};
        } else {
            return {period1: period1, period2: period2, intersect1: false};
        }
    }
}

function periodAddError(period1, period2, formBlockError){
    let error3Html = `
        <p class="error_text">Периоды не могут совпадать и/или пересекаться</p>
    `;

    if(!periodCheckChronology(formBlockError) && periodCheck(period1, period2) && periodCheck(period1, period2).intersect1){
        let blockInputsPeriod1Length = periodCheck(period1, period2).period1.querySelectorAll(".block_inputs:not(.radio)").length;
        let blockInputsPeriod1 = periodCheck(period1, period2).period1.querySelectorAll(".block_inputs:not(.radio)")[blockInputsPeriod1Length - 1];
        
        let blockInputsPeriod5Length = periodCheck(period1, period2).period2.querySelectorAll(".block_inputs:not(.radio)").length;
        let blockInputsPeriod5 = periodCheck(period1, period2).period2.querySelectorAll(".block_inputs:not(.radio)")[blockInputsPeriod5Length - 1];
        

        blockInputsPeriod1.querySelectorAll(".error_text").forEach(errorText => {
            blockInputsPeriod1.removeChild(errorText);
        });

        blockInputsPeriod1.classList.add("_error");
        blockInputsPeriod1.insertAdjacentHTML("beforeend", error3Html);
        blockInputsPeriod1.lastElementChild.classList.add("first");

        blockInputsPeriod5.querySelectorAll(".error_text").forEach(errorText => {
            blockInputsPeriod5.removeChild(errorText);
        });

        blockInputsPeriod5.classList.add("_error");
        blockInputsPeriod5.insertAdjacentHTML("beforeend", error3Html);
        blockInputsPeriod5.lastElementChild.classList.add("first");
    } else if(
        !periodCheckChronology(formBlockError) &&
        periodCheck(period1, period5) && !periodCheck(period1, period5).intersect1
    ){
        let blockInputsPeriod1Length = periodCheck(period1, period5).period1.querySelectorAll(".block_inputs:not(.radio)").length;
        let blockInputsPeriod1 = periodCheck(period1, period5).period1.querySelectorAll(".block_inputs:not(.radio)")[blockInputsPeriod1Length - 1];
        
        let blockInputsPeriod5Length = periodCheck(period1, period5).period2.querySelectorAll(".block_inputs:not(.radio)").length;
        let blockInputsPeriod5 = periodCheck(period1, period5).period2.querySelectorAll(".block_inputs:not(.radio)")[blockInputsPeriod5Length - 1];


        blockInputsPeriod1.querySelectorAll(".error_text").forEach(errorText => {
            blockInputsPeriod1.removeChild(errorText);
        });

        blockInputsPeriod1.classList.remove("_error");


        blockInputsPeriod5.querySelectorAll(".error_text").forEach(errorText => {
            blockInputsPeriod5.removeChild(errorText);
        });

        blockInputsPeriod5.classList.remove("_error");
    }
}


function buttonAddNew(buttonAdd){
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
};

function periodCheckChronology(formBlock){
    let index = 0;
    let periodCheckChronologyError = false;

    formBlock.querySelectorAll(".block_select .select").forEach(select => {
        if(index > 0){
            if(formBlock.querySelectorAll(".block_select .select .select__head")[index - 1].value === ""){
                return;
            }

            let dateStr1 = formBlock.querySelectorAll(".block_select .select .select__head")[index - 1].value;
            let dateStr2 = select.querySelector(".select__head").value;
    
            let date1 = new Date(dateStr1.split('.').reverse().join('-'));
            let date2 = new Date(dateStr2.split('.').reverse().join('-'));
            
            if (date2 < date1) {
                periodCheckChronologyError = true;
                return;
            }
        }

        index++;
    });

    return periodCheckChronologyError;
};
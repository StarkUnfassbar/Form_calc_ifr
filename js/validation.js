let isIntersection;


formValidation();
cheackBox();



function formValidation(){
    let formBlocks = document.querySelectorAll(".form_block");
    formBlockNecessarily(formBlocks);
};

function formBlockNecessarily(formBlocks){
    formBlocks.forEach(formBlock => {
        formBlock.querySelectorAll(".block_inputs:not(.radio)").forEach(blockInputs => {
            blockInputs.querySelectorAll(".error_text").forEach(errorText => {
                blockInputs.removeChild(errorText);
            });
            blockInputs.style = "";
            blockInputs.classList.remove("_error");
        });
        

        if(
            formBlock.id === "period-1" || formBlock.id === "period-2" || formBlock.id === "period-3" ||
            formBlock.id === "period-4" || formBlock.id === "period-5"
        ){
            periodError(formBlock);
        } else{
            if(
                formBlock.classList.contains("_necessarily") && ((formBlock.querySelector(".block_inputs .select") &&
                formBlock.querySelector(".block_inputs .select .select__head").value === "") ||
                ((formBlock.querySelector(".block_inputs .input_text") &&
                formBlock.querySelector(".block_inputs .input_text input").value === "")))

            ){
                let errorHtml = `
                    <p class="error_text">Заполните обязательное поле</p>
                `;

                formBlock.querySelector(".block_inputs").classList.add("_error");
                formBlock.querySelector(".block_inputs").insertAdjacentHTML("beforeend", errorHtml);
                formBlock.querySelector(".block_inputs").lastElementChild.classList.add("first");
            } else if(
                formBlock.classList.contains("_necessarily") &&
                ((formBlock.querySelector(".block_inputs .select") &&
                formBlock.querySelector(".block_inputs .select .select__head").value != "") ||
                ((formBlock.querySelector(".block_inputs .input_text") &&
                formBlock.querySelector(".block_inputs .input_text input").value != ""))) &&
                formBlock.querySelector(".block_inputs .error_text")
            ){
                formBlock.querySelector(".block_inputs").removeChild(formBlock.querySelector(".block_inputs .error_text"));
                formBlock.querySelector(".block_inputs").classList.remove("_error");
            }
        }
    });
}

function periodError(formBlock){
    isIntersection = false;

    let error1Html = `
        <p class="error_text">Периоды заполняются по хронологии: от самого раннего до самого позднего</p>
    `;

    let error2Html = `
        <p class="error_text">Поле должно быть заполнено</p>
    `;

    let error3Html = `
        <p class="error_text">Заполните обязательное поле</p>
    `;

    let error4Html = `
        <p class="error_text">Отсутствует одна из дат</p>
    `;


    const blockInputsLength = formBlock.querySelectorAll(".block_inputs:not(.radio)").length;
    const blockInputsLast = formBlock.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];
    const blockInputs = formBlock.querySelectorAll(".block_inputs:not(.radio)");

    let emptyElementFound = false;

    if(blockInputsLength > 1){
        blockInputs.forEach(blockInput => {
            let selects = blockInput.querySelectorAll(".select .select__head");
            let emptyElementsCounts = (Array.from(selects).filter(select => select.value === "")).length;

            if(blockInput != blockInputsLast){                
                if(emptyElementsCounts === 1){
                    blockInput.classList.add("_error");

                    blockInput.insertAdjacentHTML("beforeend", error2Html);

                    if(window.innerWidth <= 600){
                        if(selects[0].value === ""){
                            blockInput.lastElementChild.classList.add("first");
                            blockInput.lastElementChild.style.bottom = "120px";
                            selects[0].closest(".block_select").style.paddingBottom = "30px";
                        } else{
                            blockInput.lastElementChild.classList.add("first");
                            selects[0].closest(".block_select").style = "";
                        }
                    } else{
                        if(selects[0].value === ""){
                            blockInput.lastElementChild.classList.add("first");
                        } else{
                            blockInput.lastElementChild.classList.add("second");
                        }
                    }

                    emptyElementFound = true;
                } else if(emptyElementsCounts === 2){
                    blockInput.classList.add("_error");

                    if(window.innerWidth <= 600){
                        blockInput.insertAdjacentHTML("beforeend", error2Html);
                        blockInput.lastElementChild.classList.add("first");
                        blockInput.lastElementChild.style.bottom = "120px";
                        selects[0].closest(".block_select").style.paddingBottom = "30px";
    
                        blockInput.insertAdjacentHTML("beforeend", error2Html);
                        blockInput.lastElementChild.classList.add("first");
                    } else{
                        blockInput.insertAdjacentHTML("beforeend", error2Html);
                        blockInput.lastElementChild.classList.add("first");
    
                        blockInput.insertAdjacentHTML("beforeend", error2Html);
                        blockInput.lastElementChild.classList.add("second");
                    }

                    emptyElementFound = true;
                } else{
                    selects[0].closest(".block_select").style = "";
                }
            } else if(blockInput === blockInputsLast){
                if(emptyElementsCounts === 1){
                    blockInputsLast.classList.add("_error");

                    blockInputsLast.insertAdjacentHTML("beforeend", error4Html);
                    blockInputsLast.lastElementChild.classList.add("first");

                    emptyElementFound = true;
                }
            }
        });

        if(emptyElementFound){
            periodsClear();
            return;
        }
    } else if(blockInputsLength === 1){
        let selects = blockInputsLast.querySelectorAll(".select .select__head");
        selects[0].closest(".block_select").style = "";
        let emptyElementsCounts = (Array.from(selects).filter(select => select.value === "")).length;

        if(emptyElementsCounts === 2 && formBlock.classList.contains("_necessarily")){
            blockInputsLast.classList.add("_error");

            blockInputsLast.insertAdjacentHTML("beforeend", error3Html);
            blockInputsLast.lastElementChild.classList.add("first");

            blockInputsLast.insertAdjacentHTML("beforeend", error3Html);
            blockInputsLast.lastElementChild.classList.add("second");

            periodsClear();
            periodsChronology();
            return;
        } else if(emptyElementsCounts === 1){
            blockInputsLast.classList.add("_error");

            blockInputsLast.insertAdjacentHTML("beforeend", error4Html);
            blockInputsLast.lastElementChild.classList.add("first");

            periodsClear();
            periodsChronology();
            return;
        }
    }


    if(periodCheckChronology(formBlock, true)){
        blockInputs.forEach(blockInput => {
            blockInput.classList.add("_error");

            if(blockInputsLength > 1 && blockInput != blockInputsLast){
                blockInput.style.paddingBottom = "0";
            }
        });

        blockInputsLast.insertAdjacentHTML("beforeend", error1Html);
        blockInputsLast.lastElementChild.classList.add("first");

        periodsClear();
        return;
    }

    periodsClear();
};

function periodCheckChronology(formBlock, bool){
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
            
            // if(date1.getDate() == date2.getDate()){
            //     isIntersection = true;
            // }

            if(bool){
                if (date2 <= date1) {
                    periodCheckChronologyError = true;
                    return;
                }
            } else{
                if (date2 < date1) {
                    periodCheckChronologyError = true;
                    return;
                }
            }
        }

        index++;
    });

    return periodCheckChronologyError;
};

function periodsChronology(){
    let error1Html = `
        <p class="error_text">Периоды заполняются по хронологии: от самого раннего до самого позднего</p>
    `;

    let periods = [];
    periods.push(document.querySelector("#period-1"));
    periods.push(document.querySelector("#period-2"));
    periods.push(document.querySelector("#period-3"));
    periods.push(document.querySelector("#period-4"));
    periods.push(document.querySelector("#period-5"));

    periods.forEach(period => {
        const blockInputsLength = period.querySelectorAll(".block_inputs:not(.radio)").length;
        const blockInputsLast = period.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];
        const blockInputs = period.querySelectorAll(".block_inputs:not(.radio)");

        if(periodCheckChronology(period, true) && !blockInputsLast.querySelector(".error_text")){
            blockInputs.forEach(blockInput => {
                blockInput.classList.add("_error");
    
                if(blockInputsLength > 1 && blockInput != blockInputsLast){
                    blockInput.style.paddingBottom = "0";
                }
            });
    
            blockInputsLast.insertAdjacentHTML("beforeend", error1Html);
            blockInputsLast.lastElementChild.classList.add("first");

            buttonsAddCheckActive(period);
        }
    });
};

function periodIntersectionStart(formBlock){
    let period1 = document.querySelector("#period-1");
    let period2 = document.querySelector("#period-2");
    let period3 = document.querySelector("#period-3");
    let period4 = document.querySelector("#period-4");
    let period5 = document.querySelector("#period-5");


    if(formBlock.id === "period-1"){
        if(
            (!period1.querySelector(".error_text") || period1.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period1, false) && period1.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period1, period5, formBlock);
        }

        if(
            (!period1.querySelector(".error_text") || period1.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period1, false) && period1.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period1, period2, formBlock);
        }
    }

    if(formBlock.id === "period-2"){
        if(
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) &&
            (!period1.querySelector(".error_text") || period1.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period1, false) && period1.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period2, period1, formBlock);
        }

        if(
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period2, period3, formBlock);
        }

        if(
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period2, period4, formBlock);
        }

        if(
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period2, period5, formBlock);
        }
    }

    if(formBlock.id === "period-3"){
        if(
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period3, period2, formBlock);
        }

        if(
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period3, period4, formBlock);
        }

        if(
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period3, period5, formBlock);
        }
    }

    if(formBlock.id === "period-4"){
        if(
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period4, period2, formBlock);
        }

        if(
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period4, period3, formBlock);
        }

        if(
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period4, period5, formBlock);
        }
    }

    if(formBlock.id === "period-5"){
        if(
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) &&
            (!period1.querySelector(".error_text") || period1.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period1, false) && period1.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period5, period1, formBlock);
        }

        if(
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period2.querySelector(".error_text") || period2.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period2, false) && period2.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period5, period2, formBlock);
        }


        if(
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period3.querySelector(".error_text") || period3.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period3, false) && period3.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period5, period3, formBlock);
        }

        if(
            (!period5.querySelector(".error_text") || period5.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period5, false) && period5.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего")) && 
            (!period4.querySelector(".error_text") || period4.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться" || (!periodCheckChronology(period4, false) && period4.querySelector(".error_text").innerText === "Периоды заполняются по хронологии: от самого раннего до самого позднего"))
        ){
            periodAddError(period5, period4, formBlock);
        }
    }
};

function periodAddError(period1, period2){
    let errorHtml = `
        <p class="error_text">Периоды не могут совпадать и/или пересекаться</p>
    `;

    period1.querySelectorAll(".block_inputs:not(.radio)").forEach(blockInputs => {
        let period1BlockInputs = blockInputs.querySelectorAll(".select .select__head");

        if(periodCheck(period1BlockInputs, period2).length > 0){
            if(!blockInputs.querySelector(".error_text")){
                blockInputs.classList.add("_error");
                blockInputs.insertAdjacentHTML("beforeend", errorHtml);
                blockInputs.lastElementChild.classList.add("first");
            }
            
            periodCheck(period1BlockInputs, period2).forEach(period2BlockInputs => {
                if(!period2BlockInputs.querySelector(".error_text")){
                    period2BlockInputs.classList.add("_error");
                    period2BlockInputs.insertAdjacentHTML("beforeend", errorHtml);
                    period2BlockInputs.lastElementChild.classList.add("first");
                } else{
                    period2BlockInputs.querySelector(".error_text").innerText = "Периоды не могут совпадать и/или пересекаться";
                }

                isIntersection = true;
            });

            buttonsAddCheckActive(period1);
            buttonsAddCheckActive(period2);
        }
    });
};

function periodCheck(period1BlockInputs, period2){
    let period2BlocksInputs = [];

    period2.querySelectorAll(".block_inputs:not(.radio)").forEach(blockInputs => {
        let period2BlockInputs = blockInputs.querySelectorAll(".select .select__head");

        let startDate1 = period1BlockInputs[0].value
        startDate1 = new Date(startDate1.split('.').reverse().join('-'));
    
        let startDate2 = period2BlockInputs[0].value
        startDate2 = new Date(startDate2.split('.').reverse().join('-'));
    
        let endDate1 = period1BlockInputs[1].value;
        endDate1 = new Date(endDate1.split('.').reverse().join('-'));
    
        let endDate2 = period2BlockInputs[1].value;
        endDate2 = new Date(endDate2.split('.').reverse().join('-'));
    
        if ((startDate1 <= endDate2 && startDate1 >= startDate2) || (startDate2 <= endDate1 && startDate2 >= startDate1)){
            period2BlocksInputs.push(blockInputs);
        }
    });

    return period2BlocksInputs;
};

function periodsClear(){
    let periods = [];
    periods.push(document.querySelector("#period-1"));
    periods.push(document.querySelector("#period-2"));
    periods.push(document.querySelector("#period-3"));
    periods.push(document.querySelector("#period-4"));
    periods.push(document.querySelector("#period-5"));

    periods.forEach(period => {
        period.querySelectorAll(".block_inputs:not(.radio)").forEach(blockInputs => {
            if(blockInputs.querySelector(".error_text") && blockInputs.querySelector(".error_text").innerText === "Периоды не могут совпадать и/или пересекаться"){
                blockInputs.removeChild(blockInputs.querySelector(".error_text"));
                blockInputs.classList.remove("_error");
            }
        });

        periodIntersectionStart(period);
        buttonsAddCheckActive(period);
    });
};

function cheackBox(){
    document.querySelector("#agreement input").addEventListener("click", () =>{
        buttonResultActive();
    });
};
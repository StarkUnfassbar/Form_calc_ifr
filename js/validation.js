formValidation();
cheackBox();

function formValidation(){
    let formBlocksError = document.querySelectorAll(".form_block._necessarily");
    formBlockNecessarily(formBlocksError);
};

function formBlockNecessarily(formBlocksError){
    formBlocksError.forEach(formBlockError => {
        if(formBlockError.classList.contains("_necessarily")){
            const blockInputsErrorLength = formBlockError.querySelectorAll(".block_inputs:not(.radio)").length;
            let blockInputsError = formBlockError.querySelectorAll(".block_inputs:not(.radio)")[blockInputsErrorLength - 1];
            
            if(blockInputsError.querySelectorAll(".block_select").length >= 2){
                blockErrorCheak(formBlockError, blockInputsError.querySelectorAll(".block_select")[0], 1);
                blockErrorCheak(formBlockError, blockInputsError.querySelectorAll(".block_select")[1], 2);
            }
            
            if(
                formBlockError.querySelector(".block_inputs").querySelector(".block_select") &&
                formBlockError.querySelector(".block_inputs").querySelector(".input_text")
            ){
                blockErrorCheak(formBlockError, blockInputsError.querySelector(".block_select"), 1);
                blockErrorCheak(formBlockError, blockInputsError.querySelector(".input_text"), 2);
            }
    
            if(
                !formBlockError.querySelector(".block_inputs").querySelector(".block_select") &&
                formBlockError.querySelector(".block_inputs").querySelector(".input_text")
            ){
                blockErrorCheak(formBlockError, blockInputsError.querySelector(".input_text"), 1);
            }
    
            if(
                blockInputsError.querySelectorAll(".block_select").length < 2 &&
                formBlockError.querySelector(".block_inputs").querySelector(".block_select") &&
                !formBlockError.querySelector(".block_inputs").querySelector(".input_text")
            ){
                blockErrorCheak(formBlockError, blockInputsError.querySelector(".block_select"), 1);
            }
        } else if(formBlockError.querySelectorAll(".block_inputs:not(.radio) .block_select").length >= 2){
            periodError(formBlockError);
        }
    });
}

function blockErrorCheak(formBlockError, blockError, number){
    if(blockError.classList.contains("block_select") && blockError.querySelector(".select__head").value == ""){
        let errorHtml = `
            <p class="error_text">Заполните обязательное поле</p>
        `;
        const blockInputsLength = formBlockError.querySelectorAll(".block_inputs:not(.radio)").length;
        const blockInputs = formBlockError.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];

        if(
            blockInputs.querySelectorAll(".block_select").length === 2 &&
            ((number === 2 && blockInputs.querySelectorAll(".select__head")[0].value != "") ||
            (number === 1 && blockInputs.querySelectorAll(".select__head")[1].value != ""))
        ){
            return;
        }


        formBlockError.querySelectorAll(".block_inputs:not(.radio) .error_text").forEach(errorText => {
            if(errorText.textContent != "Заполните обязательное поле"){
                errorText.closest(".block_inputs").removeChild(errorText);
            }
        });

        blockInputs.classList.add("_error");
        if(blockInputs.querySelectorAll(".error_text").length != 2){
            blockInputs.insertAdjacentHTML("beforeend", errorHtml);

            if(number === 1){
                blockInputs.lastElementChild.classList.add("first");
            } else{
                blockInputs.lastElementChild.classList.add("second");
            }
        }
    } else if(blockError.classList.contains("input_text") && blockError.querySelector(".input_text input").value == ""){
        let errorHtml = `
            <p class="error_text">Заполните обязательное поле</p>
        `;


        if(
            (number === 1 && formBlockError.querySelector(".block_inputs error_text.first")) ||
            (number === 2 && formBlockError.querySelector(".block_inputs error_text.second"))
        ){
            return;
        }

        formBlockError.querySelector(".block_inputs:not(.radio)").classList.add("_error");
        formBlockError.querySelector(".block_inputs:not(.radio)").insertAdjacentHTML("beforeend", errorHtml);
        if(number === 1){
            formBlockError.querySelector(".block_inputs:not(.radio)").lastElementChild.classList.add("first");
        } else{
            formBlockError.querySelector(".block_inputs:not(.radio)").lastElementChild.classList.add("second");
        }
    } else{
        formBlockError.querySelectorAll(".block_inputs:not(.radio) .error_text").forEach(errorText => {
            errorText.closest(".block_inputs").removeChild(errorText);
        });

        periodError(formBlockError);

        if(
            !formBlockError.querySelector(".block_inputs:not(.radio) .error_text.first") &&
            !formBlockError.querySelector(".block_inputs:not(.radio) .error_text.second")
        ){
            formBlockError.querySelector(".block_inputs:not(.radio)").classList.remove("_error");
        }
    }
}

function periodError(formBlockError){
    let error1Html = `
        <p class="error_text">Отсутствует одна из дат</p>
    `;

    let error2Html = `
        <p class="error_text">Периоды заполняются по хронологии: от самого раннего до самого позднего</p>
    `;

    const blockInputsLength = formBlockError.querySelectorAll(".block_inputs:not(.radio)").length;
    const blockInputs = formBlockError.querySelectorAll(".block_inputs:not(.radio)")[blockInputsLength - 1];

    blockInputs.querySelectorAll(".error_text").forEach(errorText => {
        blockInputs.removeChild(errorText);
    });
    
    if(
        blockInputs.querySelectorAll(".block_select").length === 2 &&
        (blockInputs.querySelectorAll(".block_select .select__head")[0].value === "" ||
        blockInputs.querySelectorAll(".block_select .select__head")[1].value === "")
    ){
        blockInputs.classList.add("_error");
        blockInputs.insertAdjacentHTML("beforeend", error1Html);
        blockInputs.lastElementChild.classList.add("first");
    }

    if(
        !blockInputs.querySelector(".error_text.first") &&
        !blockInputs.querySelector(".error_text.second")
    ){
        blockInputs.classList.remove("_error");
    }

    
    if(periodCheckChronology(formBlockError)){
        blockInputs.querySelectorAll(".error_text").forEach(errorText => {
            blockInputs.removeChild(errorText);
        });

        blockInputs.classList.add("_error");
        blockInputs.insertAdjacentHTML("beforeend", error2Html);
        blockInputs.lastElementChild.classList.add("first");
    } else if(
        blockInputs.querySelectorAll(".block_select").length === 2 &&
        (blockInputs.querySelectorAll(".block_select .select__head")[0].value != "" &&
        blockInputs.querySelectorAll(".block_select .select__head")[1].value != "")
    ){
        blockInputs.querySelectorAll(".error_text").forEach(errorText => {
            blockInputs.removeChild(errorText);
        });

        blockInputs.classList.remove("_error");
    }


    periodIntersectionStart(formBlockError);
}

function periodIntersectionStart(formBlockError){
    let period1 = document.querySelector("#period-1");
    let period2 = document.querySelector("#period-2");
    let period3 = document.querySelector("#period-3");
    let period4 = document.querySelector("#period-4");
    let period5 = document.querySelector("#period-5");

    if(formBlockError.id === "period-1"){
        periodAddError(period1, period5, formBlockError);
        periodAddError(period1, period2, formBlockError);
    }

    if(formBlockError.id === "period-2"){
        periodAddError(period2, period1, formBlockError);
        periodAddError(period2, period3, formBlockError);
        periodAddError(period2, period4, formBlockError);
        periodAddError(period2, period5, formBlockError);
    }

    if(formBlockError.id === "period-3"){
        periodAddError(period3, period2, formBlockError);
        periodAddError(period3, period4, formBlockError);
        periodAddError(period3, period5, formBlockError);
    }

    if(formBlockError.id === "period-4"){
        periodAddError(period4, period2, formBlockError);
        periodAddError(period4, period3, formBlockError);
        periodAddError(period4, period5, formBlockError);
    }

    if(formBlockError.id === "period-5"){
        periodAddError(period5, period1, formBlockError);
        periodAddError(period5, period2, formBlockError);
        periodAddError(period5, period3, formBlockError);
        periodAddError(period5, period4, formBlockError);
    }
}

function cheackBox(){
    document.querySelector("#agreement input").addEventListener("click", () =>{
        buttonResultActive();
    });
};
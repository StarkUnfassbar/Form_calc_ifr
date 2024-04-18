let buttonResult = document.querySelector("#buttom-result");
let agreement = document.querySelector("#agreement");
let necessarilyBlocks = document.querySelectorAll("._necessarily");

let necessarilyBlockScroll;

let agreementErrorHtml = `
    <p class="error_text">Необходимо подтвердить согласие</p>
`;



agreement.addEventListener("click", () => {
    if(agreement.querySelector("input").checked){
        if(agreement.querySelector(".error_text")){
            agreement.removeChild(agreement.querySelector(".error_text"));
        }
    } else{
        if(!agreement.querySelector(".error_text")){
            agreement.insertAdjacentHTML("beforeend", agreementErrorHtml);
        }
    }
});

buttonResultActive();


buttonResult.addEventListener("click", (e) => {
    e.preventDefault();

    if(buttonResultValidation()){
        if(agreement.querySelector("input").checked){
            if(agreement.querySelector(".error_text")){
                agreement.removeChild(agreement.querySelector(".error_text"));
            }

            window.location.href = buttonResult.getAttribute('href');
        } else{
            if(!agreement.querySelector(".error_text")){
                agreement.insertAdjacentHTML("beforeend", agreementErrorHtml);
            }
        }
    } else{
        necessarilyBlockScroll.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});



function buttonResultValidation(){
    let passedValidation = true;

    let searchError = false;
    necessarilyBlocks.forEach(necessarilyBlock => {
        if(
            !searchError &&
            necessarilyBlock.querySelector(".block_select .select .select__head") &&
            necessarilyBlock.querySelector(".block_select .select .select__head").value === ""
        ){
            necessarilyBlockScroll = necessarilyBlock;
            searchError = true;

            passedValidation = false;
        } else if(
            !searchError && necessarilyBlock.querySelector(".input_text input") &&
            necessarilyBlock.querySelector(".input_text input").value === ""
        ){
            necessarilyBlockScroll = necessarilyBlock;
            searchError = true;
            
            passedValidation = false;
        }
    });
    searchError = false;

    if(document.querySelector("._error")){
        necessarilyBlockScroll = document.querySelector("._error").closest(".form_block");
        passedValidation = false;
    }

    return passedValidation;
}

function buttonResultActive(){
    if(buttonResultValidation() && agreement.querySelector("input").checked){
        buttonResult.classList.add("_active");
    } else{
        buttonResult.classList.remove("_active");
    }
};
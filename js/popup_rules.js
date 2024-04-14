let buttonOpenRules = document.querySelector("#button-open-rules");
let buttonCloseRules = document.querySelector(".popup_rules .popup_close");
let rulesCloseFunActive = false;

buttonOpenRules.addEventListener("click", () => {
    document.querySelector("body").classList.add("lock");

    document.querySelector(".popup_rules").classList.remove("none");
    setTimeout(() => {
        document.querySelector(".popup_rules").classList.add("_active");
    }, 10);

    if(!rulesCloseFunActive){
        rulesClose();
        rulesCloseFunActive = true;
    }
});


function rulesClose(){
    buttonCloseRules.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector("body").classList.remove("lock");
        document.querySelector(".popup_rules").classList.remove("_active");
        setTimeout(() => {
            document.querySelector(".popup_rules").classList.add("none");
        }, 700);
    });
};
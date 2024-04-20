let selects = document.querySelectorAll(".select:not(.date)");
let selectTimeout;

selects.forEach(select => {
    let selectOptionsFunActive = false; 
    let selectChangeFunActive = false;
    let options = select.querySelectorAll(".select__list li");

    let selectEvent = (e) => {
        if(
            e.target.closest(".select") === select &&
            !select.querySelector(".select__list").contains(e.target) &&
            e.target.closest(".select") != select && e.type == "touchstart"
        ){
            selectChangeFunActive = true;
            selectChange(e.target.closest(".select"), selectOptionsFunActive);

            if(!selectOptionsFunActive){
                selectOptions(select, options);
                selectOptionsFunActive = true;
            }
        } else if (
            e.target.closest(".select") === select &&
            !select.querySelector(".select__list").contains(e.target) &&
            e.type == "click" && !selectChangeFunActive
        ){
            selectChange(e.target.closest(".select"), selectOptionsFunActive);

            if(!selectOptionsFunActive){
                selectOptions(select, options);
                selectOptionsFunActive = true;
            }
        }
    };

    select.addEventListener("touchstart", (e) => selectEvent(e));
    select.addEventListener("click", (e) => selectEvent(e));


    selectCheckActive(select);


    if(select.querySelector(".select__head").value != "" && select.closest(".block_inputs").querySelector(".input_text input")){
        select.closest(".block_inputs").querySelector(".input_text input").removeAttribute('readonly');
    }
});



function selectChange(select, selectOptionsFunActive){
    if(select.classList.contains("_active")){
        select.classList.remove("_active");

        selectTimeout = setTimeout(() => {
            select.querySelector(".select__list").classList.add("none");
        }, 310);
    } else{
        clearTimeout(selectTimeout);
        select.querySelector(".select__list").classList.remove("none");

        setTimeout(() => {
            select.classList.add("_active");
        }, 50);
    }
};

function selectCheckActive(select){
    window.addEventListener("click", (e) => {
        if(!select.contains(e.target) && select.classList.contains("_active")){
            console.log(1)
            select.classList.remove("_active");

            selectTimeout = setTimeout(() => {
                select.querySelector(".select__list").classList.add("none");
            }, 310);
        }
    });
};

function selectOptions(select, options){
    options.forEach(option => {
        option.addEventListener("click", () => {
            if(select.querySelector(".select__list li._active")){
                select.querySelector(".select__list li._active").classList.remove("_active");
            }


            option.classList.add("_active");
            select.querySelector(".select__head").value = option.innerText;


            select.classList.remove("_active");

            selectTimeout = setTimeout(() => {
                select.querySelector(".select__list").classList.add("none");
            }, 310);

            if(select.closest(".block_inputs").querySelector(".input_text input")){
                select.closest(".block_inputs").querySelector(".input_text input").removeAttribute('readonly');
            }
        });
    });
};
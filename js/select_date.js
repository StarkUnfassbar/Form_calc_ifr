let selectsDate = document.querySelectorAll(".select.date");
let selectInputs = document.querySelectorAll(".select.date .select__head");


const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

let currentDate = new Date();



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


selectInputs.forEach(selectInput => {
    let select = selectInput.closest(".select");

    selectInput.addEventListener('keydown', function(e) {
        let selectHeadStr = selectInput.value.replace(/\./g, '').replace(/_/g, '');
        if(selectHeadStr.length > 8 && e.key !== 'Backspace' && e.key !== 'Delete') {
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
        } else if(selectHeadStr.length == 0){
            const formBlocksError = [];
            formBlocksError.push(select.closest(".form_block"));
            formBlockNecessarily(formBlocksError);
            buttonsAddCheckActive(select.closest(".form_block"));
        }
    });
});



function selectDateCheckActive(select){
    window.addEventListener("click", (e) => {
        if(!select.contains(e.target) && select.classList.contains("_active")){
            select.classList.remove("_active");

            let selectHeadStr = select.querySelector(".select__head").value.replace(/\./g, '').replace(/_/g, '');

            if(selectHeadStr.length != 8){
                select.querySelector(".select__head").value = "";
            } else{
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
                    new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) -1, parseInt(selectHeadStr.substr(0, 2))) > today ||
                    new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) - 1, 1) < minDate
                ){
                    select.querySelector(".select__head").value = "";
                }
            }

            const formBlocksError = [];
            formBlocksError.push(select.closest(".form_block"));
            formBlockNecessarily(formBlocksError);
            buttonsAddCheckActive(select.closest(".form_block"));
        }
    });
};
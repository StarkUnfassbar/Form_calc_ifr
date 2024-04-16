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
    let selectHeight = select.closest(".block_select").offsetHeight;
    let selectChangeFunActive = false;

    // let selectEvent = (e) => {
    //     if (e.target.closest(".select") === select && e.type == "touchstart"){
    //         selectChangeFunActive = true;
    //         if(!select.querySelector(".select__calendar .calendar table")){
    //             selectDateChange(e.target.closest(".select"), selectHeight);
    //         } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
    //             selectDateChange(e.target.closest(".select"), selectHeight);
    //         }
    //     } else if (e.target.closest(".select") === select && e.type == "click" && !selectChangeFunActive){
    //         if(!select.querySelector(".select__calendar .calendar table")){
    //             selectDateChange(e.target.closest(".select"), selectHeight);
    //         } else if(!select.querySelector(".select__calendar .calendar table").contains(e.target)){
    //             selectDateChange(e.target.closest(".select"), selectHeight);
    //         }
    //     }
    // };

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


selectInputs.forEach(selectInput => {
    let select = selectInput.closest(".select");

    // const mask = new IMask(selectInput, {
    //     mask: "d0.m0.0000",
    //     lazy: false,
    //     blocks: {
    //         'd': {
    //             mask: IMask.MaskedRange,
    //             from: 0,
    //             to: 3
    //         },
    //         'm': {
    //             mask: IMask.MaskedRange,
    //             from: 0,
    //             to: 1
    //         },
    //         '0': {
    //             mask: IMask.MaskedRange,
    //             from: 0,
    //             to: 9
    //         }
    //     }
    // });

    selectInput.addEventListener('keydown', function(e) {
        let selectHeadStr = selectInput.value.replace(/\./g, '').replace(/_/g, '');
        if(selectHeadStr.length >= 8 && e.key !== 'Backspace' && e.key !== 'Delete') {
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

            // let selectHeadStr = select.querySelector(".select__head").value.replace(/\./g, '').replace(/_/g, '');
            // if(selectHeadStr.length != 8) {
            //     select.querySelector(".select__head").value = "";
            // } else {
            //     let today = new Date();

            //     let minDateStr = (select.getAttribute('data-minvalue')).split(".");
            //     let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);
                
            //     const daysInMonth = parseInt((new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)), 0)).getDate());
            //     if(parseInt(selectHeadStr.substr(0, 2)) < 1 || parseInt(selectHeadStr.substr(0, 2)) > daysInMonth){
            //         select.querySelector(".select__head").value = "";
            //     } else if(
            //         new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) - 1, parseInt(selectHeadStr.substr(0, 2))) > today &&
            //         new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)) - 1, 1) < minDate
            //     ){
            //         select.querySelector(".select__head").value = "";
            //     }
            // }

            if(selectHeadStr.length != 8){
                select.querySelector(".select__head").value = "";
            } else{
                let today = new Date();
    
                let minDateStr = (select.getAttribute('data-minvalue')).split(".");
                let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);
    
                const daysInMonth = parseInt((new Date(selectHeadStr.substr(4, 4), parseInt(selectHeadStr.substr(2, 2)), 0)).getDate());
                console.log(parseInt(selectHeadStr.substr(4, 4)))
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



function selectDateChange(select, selectHeight){
    if(!select.classList.contains("_active")){
        select.classList.add("_active");

        if(window.innerWidth < 400){
            select.closest(".block_select").style.height = "320px";
        } else{
            select.closest(".block_select").style.height = "393px";
        }


        let cell = 0;

        let calendarArrows = select.querySelectorAll(".select__calendar .calendar__arrow");
        let headerMonth = select.querySelector(".select__calendar .calenar__header");
        let container = select.querySelector(".select__calendar .calendar");

        let currentMonth = currentDate.getMonth();
        let thisMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        let thisYear = currentDate.getFullYear();

        if(!container.querySelector("table")){
            if(select.querySelector(".select__head").value != ""){
                createCalendar(select, selectHeight, parseInt(select.querySelector(".select__head").value.substr(6, 4)), parseInt(select.querySelector(".select__head").value.substr(3, 2)) - 1, headerMonth, container, cell);
            } else{
                createCalendar(select, selectHeight, currentYear, currentMonth, headerMonth, container, cell);
            }

            select.querySelectorAll("table td span").forEach(cell => {
                if(
                    cell.innerText == select.querySelector(".select__head").value.substr(0, 2) &&
                    !cell.closest(".button_open_audience").classList.contains("_no_active")
                ){
                    cell.classList.add("_active");
                }
            });

            calendarSwitching(select, selectHeight, calendarArrows, currentYear, currentMonth, thisMonth, thisYear, container, headerMonth, cell);
        } else{
            if(select.querySelector(".select__head").value === ""){
                createCalendar(select, selectHeight, currentYear, currentMonth, headerMonth, container, cell);
            }
        }
    }
};

function selectDateCheckActive(select, selectHeight){
    window.addEventListener("click", (e) => {
        if(!select.contains(e.target) && select.classList.contains("_active")){
            select.classList.remove("_active");
            // select.closest(".block_select").style.height = selectHeight + "px";

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

function selectDateButtonActive(select, selectHeight, year, month){
    let selectDateButtons = select.querySelectorAll(".select__calendar .calendar table .button_open_audience span");

    selectDateButtons.forEach(selectDateButton => {
        selectDateButton.addEventListener("click", () => {
            const date = new Date(year, month, selectDateButton.innerText);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;

            if(selectDateButton.closest("table").querySelector(".button_open_audience span._active")){
                selectDateButton.closest("table").querySelector(".button_open_audience span._active").classList.remove("_active")
            }
            selectDateButton.classList.add("_active");

            select.querySelector(".select__head").value = formattedDate;

            select.classList.remove("_active");
            select.closest(".block_select").style.height = selectHeight + "px";


            let formBlocksError = []; 
            formBlocksError.push(select.closest(".form_block"));
            formBlockNecessarily(formBlocksError);

            buttonsAddCheckActive(select.closest(".form_block"));
        });
    });
}


function calendarSwitching(select, selectHeight, calendarArrows, currentYear, currentMonth, thisMonth, thisYear, container, headerMonth){
    calendarArrows.forEach(calendarArrow => {
        calendarArrow.addEventListener("click", (e) => {
            e.preventDefault();

            let today = new Date();

            let minDateStr = (select.getAttribute('data-minvalue')).split(".");
            let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);

            if(select.querySelector(".select__head").value != ""){
                const date = (select.querySelector(".select__head").value).split(".");
                
                currentMonth = parseInt(date[1] - 1);
                currentYear = parseInt(date[2]);
            }


            if(calendarArrow.classList.contains("next") && new Date(currentYear, currentMonth + 1, 1) <= today){
                if(currentMonth === 11){
                    currentMonth = 0;
                    currentYear++;
                } else{
                    currentMonth++;
                }


                headerMonth.innerText = `${currentMonth} ${currentYear}`;
    
                container.innerHTML = "";
                cell = 0;
    
                select.querySelector(".select__head").value = "";
                createCalendar(select, selectHeight, currentYear, currentMonth, headerMonth, container, cell);
            } else if(calendarArrow.classList.contains("prev") && new Date(currentYear, currentMonth - 1, 1) >= minDate){
                if(currentMonth === 0){
                    currentMonth = 11;
                    currentYear--;
                } else{
                    currentMonth--;
                }


                headerMonth.innerText = `${currentMonth} ${currentYear}`;
    
                container.innerHTML = "";
                cell = 0;
    
                select.querySelector(".select__head").value = "";
                createCalendar(select, selectHeight, currentYear, currentMonth, headerMonth, container, cell);
            }
        });
    });
};

function createCalendar(select, selectHeight, year, month, headerMonth, container, cell) {
    headerMonth.innerText = `${months[month]} ${year}`;

    let today = new Date();

    let minDateStr = (select.getAttribute('data-minvalue')).split(".");
    let minDate = new Date(minDateStr[2], minDateStr[1] - 1, minDateStr[0]);
    

    let table = `
        <table>
            <tr class="week">
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
                <th>Вс</th>
            </tr>
            <tr>
    `;

    let day = new Date(year, month, 1);

    for (let i = 0; i < getDay(day); i++){
        cell += 1;
        table += `</td><td>`;
    }
    
    while (day.getMonth() === month) {
        if (getDay(day) != 6) {
            if (day < minDate) {
                table += `<td class="button_open_audience _no_active"><span>` + day.getDate() + `</span></td>`;
            } else if (day > today) {
                table += `<td class="button_open_audience _no_active"><span>` + day.getDate() + `</span></td>`;
            } else {
                table += `<td class="button_open_audience"><span>` + day.getDate() + `</span></td>`;
            }
            cell += 1;
        } else {
            if (day < minDate) {
                table += `<td class="button_open_audience _no_active"><span>` + day.getDate() + `</span></td>`;
            } else if (day > today) {
                table += `<td class="button_open_audience _no_active"><span>` + day.getDate() + `</span></td>`;
            } else {
                table += `<td class="button_open_audience"><span>` + day.getDate() + `</span></td>`;
            }
            table += `</tr><tr>`;
        }

        day.setDate(day.getDate() + 1);
    }

    while (cell < 37) {
        cell += 1;
        table += `</td><td>`;
    }

    table += `</tr></table>`;
    container.innerHTML = table;
    
    if(new Date(year, month + 1, 1) > today) {
        container.closest(".select__calendar").querySelector(".calendar__arrow.next").classList.remove("_active");
    } else{
        container.closest(".select__calendar").querySelector(".calendar__arrow.next").classList.add("_active");  
    }

    if(new Date(year, month - 1, 1) < minDate) {
        container.closest(".select__calendar").querySelector(".calendar__arrow.prev").classList.remove("_active");
    } else{
        container.closest(".select__calendar").querySelector(".calendar__arrow.prev").classList.add("_active");  
    }

    selectDateButtonActive(select, selectHeight, year, month);
}



function getDay(date){
    let day = date.getDay();
    if(day == 0) day = 7;
    return day - 1;
};
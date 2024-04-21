let blockVkActive = document.querySelector("#block-vk-active");
let buttonsRadio = blockVkActive.querySelectorAll(".input_radio input");

let formBlockVk = `
    <div class="form_block" id="block-vk">
        <h5>ВК:</h5>

        <div class="block_inputs">
            <div class="block_select" style="width: calc(50% - 10px); overflow: visible;">
                <div class="select">
                    <input class="select__head" type="text" name="" id="" readonly>
                    <ul class="select__list none">
                        <li>1,15</li>
                        <li>1,2</li>
                        <li>1,3</li>
                        <li>1,4</li>
                        <li>1,5</li>
                        <li>1,6</li>
                        <li>1,7</li>
                        <li>1,8</li>
                        <li>1,9</li>
                        <li>2,0</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;


buttonsRadio.forEach(buttonRadio => {
    if(buttonRadio.value == "no"){
        buttonRadio.checked = true;
    }

    buttonRadio.addEventListener("click", () => {
        if(buttonRadio.value == "yes" && !document.querySelector("#block-vk")){
            const formBlocks = document.querySelectorAll("body form .form_block");
            formBlocks[formBlocks.length - 1].insertAdjacentHTML("afterend", formBlockVk);
            selectNew(document.querySelector("#block-vk .block_inputs .select"));
        } else if(buttonRadio.value == "no" && document.querySelector("#block-vk")){
            document.querySelector("body form").removeChild(document.querySelector("#block-vk"));
        }
    });
});


function selectNew(select){
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
}
let inputs = document.querySelectorAll('.form_block .block_inputs .input_text input');

inputs.forEach(input => {
    input.addEventListener("input", (e) => {
        let currentValue = e.target.value;

        lastChar = currentValue.slice(-1);
        const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ','];
        
        if(lastChar === "," && inputValuefractPart(input)){
            input.value = input.value.slice(0, -1);
        } else if(!allowedKeys.includes(lastChar)){
            input.value = input.value.slice(0, -1);
        }


        let formBlocksError = []; 
        formBlocksError.push(input.closest(".form_block"));
        formBlockNecessarily(formBlocksError);
    });
});


function inputValuefractPart(input){
    if((input.value.match(/,/g) || []).length > 1){
        return true;
    }

    return false;
};

function inputNew(input){
    input.addEventListener("input", (e) => {
        let currentValue = e.target.value;

        lastChar = currentValue.slice(-1);
        const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ','];
        
        if(lastChar === "," && inputValuefractPart(input)){
            input.value = input.value.slice(0, -1);
        } else if(!allowedKeys.includes(lastChar)){
            input.value = input.value.slice(0, -1);
        }


        let formBlocksError = []; 
        formBlocksError.push(input.closest(".form_block"));
        formBlockNecessarily(formBlocksError);
    });
};
let inputs = document.querySelectorAll('.form_block .block_inputs .input_text input');

inputs.forEach(input => {
    let commaCount = 0;
    input.addEventListener('keypress', function(event) {
        const allowedKeys = [",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            
        if (event.key === ",") {
            if (inputValuefractPart(input)) {
                event.preventDefault();
            } else {
                commaCount++;
            }
        } else if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });

    input.addEventListener("input", (e) => {
        let formBlocksError = []; 
        formBlocksError.push(input.closest(".form_block"));
        formBlockNecessarily(formBlocksError);
    });
});


function inputValuefractPart(input){
    if(input.value.includes(",")){
        return true;
    }

    return false;
}
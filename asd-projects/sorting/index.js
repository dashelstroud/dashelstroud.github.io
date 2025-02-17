/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//sorts the elements of the array from smallest to largest and update the swap counter
async function bubbleSort(array){
    for(var i = 0; i < array.length; i++){ //creates a  for loop that increaes in value while running through the array
        for(var j = array.length - 1; j > 1; j-- ){//creates a loop that decreaes in value from the end of the array and actually does the sorting
            if(array[j].value < array[j - 1].value){ //if the value of the current index is less than the previous value than  the swap happens
                swap(array, j, j - 1)//swaps the values of the j and j-1 indexes in the array

                updateCounter(bubbleCounter); //updates the move count on the bubble section
                await sleep(); //slows down the sorting to make it so that we can see it happen
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){ //checks if the right index - the left index is greater than 0 BASE CASE
        return //stops the function
    }
    else{
        var index = await partitian(array, left, right) 
        if(left < index -1){
            await quickSort(array, left, index -1)
        }
               
        if(right > index){
            await quickSort(array, index, right)
        }
    }
}

// TODOs 4 & 5: Implement partition


// TODO 1: Implement swap

function swap(array, i, j){ 
    var temp = array[i];//stores array[i]'s value in a temporary variable
    array[i] = array[j];//switches the value of array[i] to the value of array[j]
    array[j] = temp; //changes the vluae4 of array[j] with the temporar variable
    drawSwap(array, i, j) //calls the drawSwap function (which draws the actual chnages made)with the changed variabes from the function
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}
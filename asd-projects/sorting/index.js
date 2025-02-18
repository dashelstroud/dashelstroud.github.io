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
        var index = await partitian(array, left, right) //stores the value of the partitian function inside of the newly created index variable
        if(left < index -1){ //checks if the left variable is less than index -1
            await quickSort(array, left, index -1) // calls the quicksort function inside of the quicksort function creating an infinite loop wihout the BASE CASE
        }
               
        if(right > index){//checks if the right variable is greater than the index value
            await quickSort(array, index, right)//calls the quickSort function, creating an infinite loop without the BASE CASE
        }
    }
}

// TODOs 4 & 5: Implement partition
async function partitian(array, left, right){
    var pivot =  array[Math.floor((right + left) / 2)].value; //create  a variable named pivot that selectes a pivot by finding the middle index of the array 
    while(left < right){//checks if the left most value is less than the right most value
        while(array[left].value < pivot){//checks if the array's left value is less tha  the pivot point
            left++//increases the left value
        }
        while(array[right].value > pivot){//checks if the array's right value is greater than the pivot
            right--//decreases the right value
        }
        if(left < right){//checks if the left value is larger than the right value
            swap(array, left, right);//swaps the left and right 
            updateCounter(quickCounter);//chnages the number on the counter on the quick side
            await sleep();//makes the sorting happen slower
        }
    }


    return left + 1 //returns the new partitian index
}

// TODO 1: Implement swap

//swaps two values of an array, is used as an argument
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
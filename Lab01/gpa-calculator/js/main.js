// Author: Gerald Burke
// WEBT 2300: Client-Side Programming in JavaScript

// Create a map of letter grades and their corresponding integer values
gradeMap = new Map([["A" , 4], ["B" , 3], ["C" , 2], ["D" , 1], ["F" , 0]]);

// Initialize count and sum variable for later incrementing
gradeSum = 0;
gradeCount = 0;

// While (true) will execute until we explicitly break out of the loop
while(true) {
    // Prompt user for input
    let input = prompt("Please enter a letter grade or 'done' to finish");
    
    // Check for 'done' string, we do this first to prevent unnecessary analysis
    if(input.toUpperCase() == "DONE") {
        // Break out of the while loop
        break;
    }
    // Check for erroneous input
    else if (!gradeMap.has(input.toUpperCase())) {
        // Use user friendly messaging to address the erroneous input
        alert("Please enter a valid grade or 'done' to finish");
        // Not strictly necessary, given there's no instruction outside of our conditional, but this instructs the loop to continue to the next iteration
        continue;
    }
    // Assuming valid input, we perform our increments and sums
    else {
        // Addition assignment (+=) stores the sum of two variables in the variable on the left
        gradeSum += gradeMap.get(input.toUpperCase());
        // Post-decrement gradecount. If you want to go down a rabbit hole, google post-decrement vs. pre-decrement
        gradeCount++;
    }
}

// To perform string interpolation in JavaScript, wrap your string literal in backticks (`) a.k.a, the weird dude under the escape key
// You can put raw JavaScript in-between the brackets of this structure ${}
// Fun fact, interpolation is predicting the value of an intermediate point between two points based on the values of those points
// In programming, we almost alway mean jamming something in the middle of a string 
alert(`The calculated GPA is: ${(gradeSum / gradeCount).toFixed(2)}!`);
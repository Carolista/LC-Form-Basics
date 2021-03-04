/*** Weekly Planner ***/

/*
    Some practice on using forms with the DOM
*/

let nextId = 0; // each entry gets a new id
function getId() {
    nextId += 1;
    return nextId;
}

// Each entry is an object based on this class
class Entry {
    constructor(day, category, activity) {
        this.id = getId();
        this.day = day;
        this.category = category;
        this.activity = activity;
    }
}

// Assign a different color for the entry labels, based on category
let colors = {
    cooking: "#c04e3a",
    exercise: "#e4823c",
    family: "#ebbb37",
    me: "#41cfbc",
    housework: "#95ce40",
    projects: "#49b9d4",
    errands: "#458add",
    social: "#765add",
    travel: "#53dd98",
    work: "#a954e6",
    other: "#999999"
}

// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {

    let entries = []; // to hold Entry-class objects

    // Create DOM objects for specific form elements
    let day = document.getElementById("day");
    let category = document.getElementById("category");
    let activity = document.getElementById("activity");
    let create = document.getElementById("create");
    let newEntry = document.getElementById("new-entry");

    function addNewEntry() {

        // Store data in new object based on Entry class
        let newEntry = new Entry(day.value, category.value, activity.value);
        entries.push(newEntry);

        // Set which day section to use in HTML template
        let dayList = document.getElementById(newEntry.day + "-list");

        // Add day header for the first time if no previous entries for this day
        if (dayList.innerHTML === "") {
            dayList.innerHTML += `
                <div class="day-header">${newEntry.day[0].toUpperCase() + newEntry.day.slice(1)}</div>
            `
        }

        // Add entry to day section on page
        dayList.innerHTML += `
            <p class="entry"><span class="dot" id="dot${newEntry.id}">${newEntry.category}</span> ${newEntry.activity}</p>
        `

        // Assign colored tag to specific entry based on its category
        document.getElementById("dot" + newEntry.id).style.backgroundColor = colors[newEntry.category];
    }

    function clearForm() {
        day.value = "";
        category.value = "";
        activity.value = "";
    }

    // Click events using event delegation
    document.addEventListener("click", function(event) {

        // Create New Entry button
        if (event.target.id === "go-to-form") {
            create.style.visibility = "hidden";
            newEntry.style.visibility = "visible";
            event.preventDefault(); // ensure this is the only button registering for the click
        }

        // Cancel button
        if (event.target.id === "cancel") {
            create.style.visibility = "visible";
            newEntry.style.visibility = "hidden";
            event.preventDefault(); // ensure this is the only button registering for the click
        }

        // Submit button
        if (event.target.id === "submit") {
             // Validate to ensure no empty input fields
            if (day.value === "" || category.value === "" || activity.value === "") {
                alert("All fields required to create a new entry.")
            } else { // Create new entry and reset form
                addNewEntry();
                clearForm();
                create.style.visibility = "visible";
                newEntry.style.visibility = "hidden";
            }
            event.preventDefault(); // prevent page from reloading
        }

    });

}
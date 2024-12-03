$(document).ready(() => {
    // Get a listing of object ids using the search function
    $(document).load("https://collectionapi.metmuseum.org/public/collection/v1/search?q=%22%22&hasImage=true&departmentId=3", (response) => {
        // Parse the text response as JSON
        data = JSON.parse(response);
        // Within passed function we will take the returned array and iterate over it
        for(let i = 0; i < data.objectIDs.length; i++) {
            // We use our list of object ids to call the objects endpoint and get information about the object
            $(document).load(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[i]}`, (objectResponse) => {
                // Take our text response and convert it to JSON
                objectData = JSON.parse(objectResponse);
                // First we check for missing values (Even if you specify 'hasImage' you can still get results without images)
                if (objectData.primaryImage != "" && objectData.title != "" && objectData.culture != "" && objectData.objectDate != "") {
                    // First we create our row and append it to the table
                    $("#content-table").append(`<tr id=row-${i}></tr>`);
                    // We create our image tag
                    image = $(`<img id=image-${i}>`);
                    // We apply a src from our data
                    image.attr("src", objectData.primaryImage);
                    // We set the height and width of the image
                    image.css("max-width", "100px");
                    image.css("max-height", "200px");
                    // We create a td to hold the image so it behaves properly in the table
                    imageHolder = $(`<td id=image-${i}-holder></td>`).css("border", "2px black solid");
                    // We create a td for the title, assign a value from our data, and create a border
                    title = $(`<td></td>`).text(objectData.title).css("border", "2px black solid");
                    // We create a td for 'culture', assign a value from our data, and create a border
                    culture = $(`<td></td>`).text(objectData.culture).css("border", "2px black solid");
                    // We create a td for date, assign a value from our data, and create a border
                    date = $(`<td></td>`).text(objectData.objectDate).css("border", "2px black solid");
                    // We append our imageholder, title, culture, and date tds to our row
                    $(`#row-${i}`).append(imageHolder, title, culture, date);
                    // We append our image to our imageholder td
                    $(`#image-${i}-holder`).append(image);
                    // Allow users to click on images to view them full-size
                    $(`#image-${i}`).attr("onclick", `window.open('${objectData.primaryImage}', '_blank')`);
                }
            });
        }
    });
});
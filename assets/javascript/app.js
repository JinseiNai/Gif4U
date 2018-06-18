// Set variables
let apiKey = "d7bvrndB8ll6gXJCH740FIlKYVRvF56Q";
let topics = ["basketball", "football", "soccer", "baseball", "badminton", "tennis", "softball", "volleyball"];

// Create a function to display the list of searchable buttons
function displayList() {
    // Empty '.list-here'
    $('.list-here').empty();
    for (i = 0; i < topics.length; i++) {
        // Assign variable to search item
        let item = topics[i];
        // Create a button with a class
        let btn = $('<button>').addClass('searchItem');
        // Add a item value to the button
        btn.attr('value', item);
        btn.text(item);
        // Display the button in .list-here
        $('.list-here').append(btn);
    }
}

$('#search-btn').on('click', function(e) {
    event.preventDefault();
    // Get value from text input
    let input = $('#search-area').val().trim();
    // Add input to topics array
    topics.push(input);
    // Update displayList
    displayList();
    $('#search-area').val("");
    
});

// On click function for when a list item is clicked
$('.list-here').on('click', '.searchItem', function(e){
    // Empty '.gif-here' of previous items
    $('.gif-here').empty();
    // Create variable for target's value
    let search = $(e.target).val();
    // Set query URL
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=d7bvrndB8ll6gXJCH740FIlKYVRvF56Q&q=${search}&limit=10&offset=0&lang=en`;

    // Use ajax to access giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // Create variable to hold response
        let result = response.data;

        // Loop through each item from result
        for (i = 0; i < result.length; i++) {
            // Create a div for each gif
            let gifDiv = $('<div class=item>');
            // Create variable to store result's rating
            let rating = result[i].rating;

            // Create a p tag to display rating
            let p = $('<p>').text("Rating: " + rating);

            // Create an image tag
            let gifImg = $('<img>');

            // Give image tag an src attribute linked to result 
            gifImg.attr("src", result[i].images.fixed_height.url);

            // Append the paragraph and image to gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImg);

            // Prepend gifDiv to '.gif-here' in the DOM
            $('.gif-here').prepend(gifDiv);
        };
    });
});

$(document).ready(function() {
    displayList();
})
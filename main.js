
// create empty object that will hold all functions
const memeApp = {}


// create function that will get both quote and giphy data using AJAX

memeApp.getGif = (query) => {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/random',
        method: 'GET',
        dataType: 'json',
        data: {
            key: 'jihEvId9hSK8jUUi9YsQTViLnVmDpDYS',
                format: 'json',
                q: 'cheeseburger',
            }
}).then((gif1) => {
    memeApp.displayGif(gif1.data.image_url);
})
}      

memeApp.getQuote = () => {
    $.ajax({
        url: 'https://favqs.com/api/qotd',
        method: 'GET',
        dataType: 'json'
    }).then((quote, author) => {
        memeApp.displayQuote(quote.quote.body);
        console.log('log1');
        memeApp.displayAuthor(quote.quote.author);
        console.log('log2');
    })
}


// create functions that will display AJAX data:
// 1) display gif on page load
// 2) display quote.author on page load
// 3) "display" quote.body on page load (except on page load we will .text("") empty string)

memeApp.displayGif = (memeImage) => {
    $('.memeImage').attr('src', memeImage);
}

memeApp.displayQuote = (displayQuote) => {
    $('.quoteAPI h3').text(displayQuote);
};

memeApp.displayAuthor = (displayAuthor) => {
    $('h2').text(`Can you meme better than ${displayAuthor} ?`);
    $('.quoteAuthor p').text(`\u2014 ${displayAuthor}`);
}

// create function that will handle our event listeners:
// 1) jquery smoothscroll plugin for header button
// 2) on submit (ie "generate"), display user text in left box, displays quote.body in right box
// 3) on reset, clear user input, pull new AJAX data, empty two containers

memeApp.events = (displayAuthor) => {
    // smooth scroll

    $('.scroll').on('click',function(){
        $('html').animate({
            scrollTop: $('.authorTitle').offset().top}, 'slow'
        );

        $('.quoteAPI').addClass('hidden');
        $('.quoteAuthor').addClass('hidden');
        $('.userName').addClass('hidden');

        let typeInstance = new TypeIt('#typeAuthor', {
            strings: "Can you meme better than " + displayAuthor + "?",
            lifelike: true
        })
    });

// display text in boxes .on generate
    $('form').on('submit',function(e){
        e.preventDefault();
        console.log('ryan calls coffeeeee time.');
        let answer = $('input[name=answer]').val();
        console.log(answer);
        let memer = $('input[name=name').val();
        console.log(memer);
        $('.quoteUser h3').text(`${answer}`);
        $('.userName p').text(`\u2014 ${memer}`);
        $('.quoteAPI').removeClass('hidden');
        $('.generate').hide();
        $('#userName').hide();
        $('#userTitle').hide();
        $('.machine').removeClass('hidden');
        $('.memeContainer2').removeClass('hidden');
        $('.quoteAuthor').removeClass('hidden');
        $('.userName').removeClass('hidden');
        $('.reset').removeClass('hidden');
    });

//reset inputs
    $('form').on('reset',function(r){
        $('.generate').show();
        $('#userName').show();
        $('#userTitle').show();
        $('html').animate({
            scrollTop: $('header').offset().top + 30
        }, 'slow');
        memeApp.getGif();
        memeApp.getQuote();
        memeApp.headerType();
        $('.memeContainer2').addClass('hidden');
        $('.machine').addClass('hidden');
        $('.quoteAuthor').addClass('hidden');
        $('.userName').addClass('hidden');
        $('.reset').addClass('hidden');
        $('.quoteUser h3').text(``);
    })

//reload page
    // $('.newMeme').on('click',function(){
    //     $('html').animate({
    //         scrollTop: $('header').offset().top + 30
    //     }, 'slow');
    //     memeApp.getGif();
    //     memeApp.getQuote();
    //     memeApp.headerType();
    //     $('.generate').show();
    //     $('#userName').show();
    //     $('#userTitle').show();
    //     $('.memeContainer2').addClass('hidden');
    //     $('.quoteAuthor').addClass('hidden');
    //     $('.userName').addClass('hidden');
        
    // })

}

//Create a function to use type JS
memeApp.headerType = () => {
    let typeInstance = new TypeIt('#typeHeader', {
        strings: "Can you meme better than . . .",
        lifelike: true
    })
}

//create function that launches app on page load
memeApp.init = () => {
    memeApp.getGif();
    memeApp.getQuote();
    memeApp.events();
    memeApp.headerType();
}

// create the document ready
$(function(){
    memeApp.init();
}); 


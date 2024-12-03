$(document).ready(() => {
    function getJoke() {
        $(document).load("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart", (response) => {
            joke = JSON.parse(response);
            $("#joke").html(`${joke.setup} <br> ${joke.delivery}`);
        });
    }

    $(document).load("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", (response) => {
        items = JSON.parse(response);
        for(let i = 0; i < 10; i++) {
            $(document).load(`https://hacker-news.firebaseio.com/v0/item/${items[i]}.json?print=pretty`, (story_response) => {
                story = JSON.parse(story_response);
                const tickerItem = $("<a class='ticker-item'></a>").text(story.title);
                tickerItem.attr("href", story.url);
                tickerItem.attr("target", "_blank");
                $("#ticker-transition").append(tickerItem);
            });
        }
    });

    $(document).load("https://binaryjazz.us/wp-json/genrenator/v1/genre/", (response) => {
        $("#genre").text(`Listening to ${response.replaceAll("\"", "")}`);
    });

    $(document).load("https://api.chucknorris.io/jokes/random", (response) => {
        const joke = JSON.parse(response).value;
        $("#norris").text(joke);
    });

    $(document).load("https://api.coincap.io/v2/assets", (response) => {
        const data = JSON.parse(response).data;

        for(i = 0; i < 30; i++) {
            const coin = data[i].symbol;
            const price = Number.parseFloat(data[i].priceUsd).toFixed(2);
            const isDown = data[i].changePercent24Hr.charAt(0) == '-';
            let item;
            if (isDown) {
                item = $("<li class='isDown'></li>").html(`${coin} : ${price} &#9660`)
            }
            else {
                item = item = $("<li class='isUp'></li>").html(`${coin} : ${price} &#9650;`)
            }

            $("#crypto").append(item);
        }
    });

    $("#joke-button").on("click", () => {
        getJoke();
    });
});
$(document).ready(() => {
    let pokemonName;
    let pokemonImage;
    let pokemonRange = 151;
    let pokemonSound;
    let score = 0;
    let gameOver = false;
    let scores = [];

    $("#guess-button").on("click", () => {
        checkGuess();
    });

    $("#name").keypress((key) => {
        if(key.which === 13 && !gameOver) {
            checkGuess();
        }
        else if(key.which === 13) {
            enterScore();
        }
    });

    $("#game-mode").on("change", () => {
        newGame();
    })

    function getPokemon() {
        let random = Math.floor(Math.random() * (pokemonRange + 1))
        $("#answer").text("Who's that Pokemon?");
        random = random == 0 ? 1 : random
        $(document).load("https://pokeapi.co/api/v2/pokemon/" + random, (response) => {
            data = JSON.parse(response);
            console.log(data);
            pokemonName = data.name;
            pokemonImage = data.sprites.front_default;
            pokemonSound = data.cries.latest;
            $("#pokemon-image").attr("src", pokemonImage);
            $("#pokemon-image").css("filter", "brightness(0%)");
            $("#pokemon-image").css("height", "400px");
            $("#pokemon-image").css("width", "400px");
            $("#pokemon-image").css("filter", "blur(4px) brightness(0%)");
        });
    }

    getPokemon();

    function resolve2Seconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000)
        })
    }

    async function checkGuess() {
        $("#pokemon-image").css("filter", "brightness(100%)");
        if(pokemonName.toLowerCase() == $("#name").val().toLowerCase()) {
            $("#answer").text(`Correct! It's ${pokemonName}!`);
            score++;
        }
        else {
            $("#answer").text(`Not even close! It's ${pokemonName}!`);
            gameOver = true;
        }
        $("#score").text(`Score: ${score}`)
        $("#name").val("");
        let cry = new Audio(pokemonSound);
        cry.play();
        await resolve2Seconds().then(() => {
            if (gameOver) {
                doGameOver();
            }
            else {
                getPokemon();
            }
        })
    }

    function doGameOver() {
        $("#guess-button").text("Submit");
        $("#name").attr("placeholder", "Enter your name...");
        $("#pokemon-image").hide();
        $("#guess-button").off("click");
        $("#guess-button").on("click", () => {
            enterScore();
        });
        $("#answer").text("Enter a name for the leaderboard!");
    }

    async function enterScore() {
        await $(document).load(`https://geraldburke.com/apis/simple-leaderboard-api/?action=newScore&gameID=1&score=${score}&userName=${$("#name").val()}`, () => {
            $(document).load("https://geraldburke.com/apis/simple-leaderboard-api/?action=topScores&gameID=1", (response) => {
                data = JSON.parse(response);
                headTag = $("<thead id='headTag'></thead>");
                headRow = $("<tr id='headRow'></tr>");
                headRank = $("<th></th>").text("Rank");
                headUName = $("<th></th>").text("Username");
                headScore = $("<th></th>").text("Score");

                $("#leaderboard").append(headTag);
                $("#headTag").append(headRow);
                $("#headRow").append(headRank, headUName, headScore);

                for(let i = 0; i < data.length; i++){
                    let rank = i + 1;
                    let uName = data[i].userName;
                    let uScore = data[i].score;

                    const rankTag = $("<td></td>").text(rank);
                    const uNameTag = $("<td></td>").text(uName);
                    const uScoreTag = $("<td></td>").text(uScore);

                    $("#leaderboard").append(`<tr id='record${i}'></tr>`);
                    $(`#record${i}`).append(rankTag, uNameTag, uScoreTag)
                }
            });
        })
        $("#guess-button").text("New Game");
        $("#guess-button").off("click");
        $("#guess-button").on("click", () => {
            newGame();
        });
        $("#name").val("");
        $("#name").attr("placeholder", "");
        $("#answer").text("");
        $("#name").attr("disabled", true);
        $("#leaderboard").show();
    }

    function newGame() {
        gameOver = false;
        $("#pokemon-image").show();
        $("#leaderboard").children().remove();
        $("#guess-button").off("click");
        $("#guess-button").on("click", () => {
            checkGuess();
        });
        $("#guess-button").text("Guess");
        $("#name").val("");
        $("#name").attr("placeholder", "Enter name...");
        $("#name").attr("disabled", false);
        $("#leaderboard").hide();
        if ($("#game-mode").val() == "original") {
            pokemonRange = 151
        } else {
            pokemonRange = 1025;
        }
        score = 0;
        count = 0;
        $("#score").text("Score: 0")
        getPokemon();
    }
});
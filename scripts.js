
var imgeasy = ["./images/mario.png", "./images/mario.png", "./images/luigi.png", "./images/luigi.png",
    "./images/mushroom.jpg", "./images/mushroom.jpg", "./images/1up.png", "./images/1up.png"
];

var imgmedium = ["./images/mario.png", "./images/mario.png", "./images/luigi.png", "./images/luigi.png",
    "./images/mushroom.jpg", "./images/mushroom.jpg", "./images/1up.png", "./images/1up.png",
    "./images/peach.jpg", "./images/peach.jpg", "./images/star.jpg", "./images/star.jpg", "./images/toad.jpeg",
    "./images/toad.jpeg", "./images/yoshi.png", "./images/yoshi.png"
];

var imghard = ["./images/mario.png", "./images/mario.png", "./images/luigi.png", "./images/luigi.png",
    "./images/mushroom.jpg", "./images/mushroom.jpg", "./images/1up.png", "./images/1up.png",
    "./images/peach.jpg", "./images/peach.jpg", "./images/star.jpg", "./images/star.jpg", "./images/toad.jpeg",
    "./images/toad.jpeg", "./images/yoshi.png", "./images/yoshi.png", "./images/boo.jpg", "./images/boo.jpg",
    "./images/Bowser.png", "./images/Bowser.png", "./images/goomba.jpg", "./images/goomba.jpg",
    "./images/koopa.jpeg", "./images/koopa.jpeg"
];

var tablelock = false;
var puntos = 0;


// Solució de random array https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
var shuffle = function(images) {
    temp = [];
    originalLength = images.length;
    for (var i = 0; i < originalLength; i++) {
        temp.push(images.splice(Math.floor(Math.random() * images.length), 1));
    }
    return temp;
};

//Aquesta funció ens reparteix les cartes al tauler
function shuffleCards(images) {
    var main = $("main")[0];
    // Aqui sustituyo el método createElement por un método jquery (Add Remove)
    var table = $("<div></div>");
    // Aqui uso un método para manipular clases (Classes)
    $(table).addClass("table");

    //En el cas de que el joc estigui en el mode difícil, canviam el width per a que quedi més "a lo ample"
    if (images.length == 24 || images.length == 16) {
        $(table).width("900px");
    }
    // Aqui sustituyo el método createElement por un método jquery (Add Remove)
    $(table).appendTo(main);

    // Cream cada carta amb un bucle que depen de la llargària de l'array d'imatges.
    for (let i = 0; i < images.length; i++) {

        var card = $("<div></div>");
        $(card).addClass("card");
        //La carta tendrá un event onclick on se crida a la funció flipCard on i serà l'id de l'imatge i la posició de l'imatge
        //dins l'array
        // Aqui uso jquery para un tratar un evento (Events)
        $(card).attr("onclick", "flipCard(" + i + ", \"" + images[i] + "\")");
        var img = $("<img>");
        // Aqui uso el método .css per cambiar el width y el height (CSS)
        $(img).attr({src:"./images/box.jpg", id:"id" + i}).css({"width":"auto", "height": "100px"});
        $(card).appendTo(table);
        $(img).appendTo(card);


    }
}

//La funció flipCard tendrà com a paràmentres l'id de l'imatge i l'imatge en si, i una vegada ha canviat l'imatge,
//canvia la classe a "flipped" i entra dins la funció matching.
function flipCard(i, image) {
    //Només podrem girar una carta si tablelock està en false, així evitam que se girin cartes mentrestant el timeout
    //de la funció unflip està en marxa.
    if (!tablelock) {
        var oldimg = document.getElementById("id" + i);
        // Aqui uso un Chaining (Chaining)
        $(oldimg).attr("src", image).addClass("flipped");
        matching();
    }
}

//Matching comproba, sempre que hi hagi dues cartes amb la classe "flipped", si les imatges són iguals o no. Si és
//la primera carta girada, hi passa de llarg, només entra a les condicions quan hi ha dues cartes girades.
function matching() {
    // Aqui uso selectors jquery (Selectors)
    var flippedcards = $(".flipped");
    if (flippedcards.length == 2) {
        //Si les cartes tenen la mateixa imatge, li canvia la classe a "match" i li lleva l'onclick per no poder
        //interactuar més amb aquella carta.
        if (flippedcards[0].src === flippedcards[1].src) {
            flippedcards[1].parentNode.removeAttribute("onclick");
            flippedcards[1].className = "match";
            flippedcards[0].parentNode.removeAttribute("onclick");
            flippedcards[0].className = "match";
            puntos += 50;
            if ($(".match").length == temp.length) {
                var table = $(".table")[0];
                var main = $("main")[0];
                setTimeout(function() { main.removeChild(table); }, 1000);
                setTimeout(function() { final(main, table); }, 1000);
            }
        } else {
            //si no compleix la condició passa el booleà tablelock a true per a no poder interactuar i ens duu a la funció
            //unflip, que el que farà és tornar a girar les cartes.
            tablelock = true;
            puntos -= 10;
            // Aqui uso FadeIn y FadeOut (Efectes)
            $(flippedcards).fadeOut(1000);
            setTimeout(function() { unflip(flippedcards); $(flippedcards).fadeIn(500);}, 1000);


        }
    }
}

//La funció unflip rep com a paràmetre la variable array flippedcards (la llista de cartes amb classe flipped) i les torna
//a posar l'imatge de la part de darrera de la carta i els canvia la classe a unflipped. En acabar, torna a obrir el tauler per
//poder esser clickat.
function unflip(flippedcards) {
    flippedcards[1].src = "./images/box.jpg";
    flippedcards[1].className = "unflipped";
    flippedcards[0].src = "./images/box.jpg";
    flippedcards[0].className = "unflipped";
    tablelock = false;

}
// La funció final() lleva el tauler i crea un missatge de victòria i una imatge festiva, a més
// de fer visible la taula classificatòria.
function final(main, table) {
    var victory = $("<div></div>");
    var h1 = $("<h1></h1>");
    var win = document.createTextNode("You win!");
    $(win).appendTo(h1);
    $(victory).addClass("win");
    var img = $("<img>");
    $(img).attr({src:"./images/win.gif", id:"happymario"}).css("margin-left", "230px");
    $(victory).appendTo(main);
    $(h1).appendTo(victory);
    $(img).appendTo(victory);
    rank();
    // Aqui uso un animate per a moure de posició la imatge de Mario quan guanyes (JQuery Animation Efectes)
    $(img).animate({height: '400px', opacity: '0.4'}, "slow").animate({width: '400px', opacity: '0.8'}, "slow");
    $(img).animate({height: '607px', opacity: '0.4'}, "slow").animate({width: '470px', opacity: '0.8'}, "slow");
}

//La funció reset analitza el que hi a al tauler i desfa tot el que no sigui el header.
function reset() {
    var table = $(".table")[0];
    var main = $("main")[0];
    var victory = $(".win")[0];
    var img = $("#happymario");
    var ranktable = $("#ranking");
    if (typeof table !== 'undefined' && typeof victory !== 'undefined') {
        main.removeChild(table);
        main.removeChild(victory);
        $(tanktable).css("display", "none");
    } else if (typeof victory !== 'undefined') {
        main.removeChild(victory);
        $(tanktable).css("display", "none");
    } else if (typeof table !== 'undefined') {
        main.removeChild(table);

    }

}
//La funció rank() fa visible la taula de classificacions i posa el nick al ranking.
function rank() {
    var ranktable = $("#ranking");
    var nick = $("input")[0].value;
    $("#nick").append(nick);
    $("#puntos").append(puntos);
    $(ranktable).css("display", "table");

}


//setDifficulty agafa per començar l'elecció escollida al selector i la passa com a variable, això ens servirà per escollir 
//quin dels arrays d'imatges hem d'emprar per a composar el tauler.
function setDifficulty() {
    var difficulty = $("select")[0].value;
    reset();
    // Aqui uso el hide para ocultar la cabecera (hide Efectes)
    $("header").hide();

    switch (difficulty) {
        case "Easy":
            shuffleCards(shuffle(imgeasy));
            imgeasy = temp;
            break;

        case "Medium":
            shuffleCards(shuffle(imgmedium));
            imgmedium = temp;
            break;

        case "Hard":
            shuffleCards(shuffle(imghard));
            imghard = temp;
            break;

    }
}
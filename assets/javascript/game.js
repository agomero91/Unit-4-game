var setClass = "column";
var imageClass = "img-thumbnail";
var defSelected = false;
var enemySelected = false;
var counter = 3;
var id = 0;
var defPoints = 0;
var enemyPoints = 0;
var defPointsCopy = 0;


var hero1 = {
    id: '1',
    name: "Batman",
    url: "assets/images/hero1.jpg",
    points: 365
};
var hero2 = {
    id: '2',
    name: "Penguin",
    url: "assets/images/hero5.jpg",
    points: 375
};
var hero3 = {
    id: '3',
    name: "Superman",
    url: "assets/images/hero3.jpg",
    points: 350
};
var hero4 = {
    id: '4',
    name: "Thor",
    url: "assets/images/hero4.jpg",
    points: 380
};

var heroes = [hero1, hero2, hero3, hero4];

$(document).ready(function() {
    loadHeroes(heroes);
});

//populate array of objects
function loadHeroes(heroes) {
    $(heroes).each(function(key, value) {
        $('div#gamediv').append("<div class='" + setClass + "'  data-id='" + value.id + "' data-source='" + value.url + "' data-name='" + value.name + "' data-point='" + value.points + "'><img id= '" + value.id + "' src='" + value.url + "' width='" + 150 + "' height='" + 290 + "' class ='" + imageClass + "'/></div>");
    });
}

$(document).on("click", ".column", function() {
    if (defSelected == false) {
        var def_Id = $(this).attr("data-id");
        var def_Name = $(this).attr("data-name");
        var def_Points = $(this).attr("data-point");
        var def_url = $(this).attr("data-source");
        // $("#defId").text(def_Id);
        $("#defName").text(def_Name);
        $("#defPoints").text(def_Points);
        $('div#divDefender').append("<div><img src='" + def_url + "' width='" + 150 + "' height='" + 290 + "' class ='" + imageClass + "'/></div>");
        defSelected = true;
        id = def_Id;
        defPoints = def_Points;
        defPointsCopy = def_Points;
    } else {
        var enemy_Id = $(this).attr("data-id");
        var enemy_Name = $(this).attr("data-name");
        var enemy_Points = $(this).attr("data-point");
        var enemy_url = $(this).attr("data-source");
        // $("#enemyId").text(enemy_Id);
        $("#enemyName").text(enemy_Name);
        $("#enemyPoints").text(enemy_Points);
        $('div#divEnemy').append("<div><img src='" + enemy_url + "' width='" + 150 + "' height='" + 290 + "' class ='" + imageClass + "'/></div>");
        id = enemy_Id;
        enemyPoints = enemy_Points
        $("#btnRandom").show(); // this is the button that generates random numbers
        $("#defMessage").text(""); //clear message

        counter--;
    }
    heroes = $.grep(heroes, function(data, index) {
        return data.id != id
    });

    $("div#gamediv").empty();
    loadHeroes(heroes);

});

//generate randowm numbers from 30 -100
$(document).on("click", "#btnRandom", function() {
    var rand1 = randomNum();

    var rand2 = randomNum();

    defPoints = defPoints - rand1;
    $("#defPoints").text(defPoints);

    enemyPoints = enemyPoints - rand2;
    $("#enemyPoints").text(enemyPoints);

    var dNotes = "You attacked your opponent with " + rand1 + " damage!"
    var eNotes = "Your enemy fires back! He attacks you with " + rand2 + " damage!"
    $("#defNotes").text(dNotes);
    $("#enemyNotes").text(eNotes);

    if (defPoints <= 0 || enemyPoints <= 0) {
        if (enemyPoints <= defPoints) {
            $("#defMessage").text("Enemy was defeated..");
            $("div#divEnemy").empty();
            $("#enemyName").text("");
            $("#enemyPoints").text("");
            $("#enemyMessage").text("");

            $("#defNotes").text("");
            $("#enemyNotes").text("");

            defPoints = defPointsCopy;
            $("#defPoints").text(defPoints);
            $("#btnRandom").hide();

            if (counter == 0) {
                $("#btnReset").show();
            }
        } else {
            $("#defMessage").text("YOU LOST THE BATTLE..");
            $("#btnReset").show();
            $("#btnRandom").hide();
        }
    }

});


function randomNum() {
    return (Math.floor(Math.random() * 100) + 1);
}

$(document).on("click", "#btnReset", function() {
    location.reload();
});
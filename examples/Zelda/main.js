$(document).ready(() => {
    function getCategory(category) {
        $(document).load(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`, (data) => {
            $("#content").children().remove();
            const compendium_data = JSON.parse(data).data;
            for(let i = 0; i < compendium_data.length; i++) {
                $("#content").append(`<tr id=${i}></tr>`);
                let nameString = compendium_data[i].name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                let name = $(`<td style="font-family: 'Triforce'; font-size: 25px;"></td>`).text(nameString);
                let description = $("<td></td>").text(compendium_data[i].description);
                let imageHolder = $(`<td id=img${i}></td>`)
                let image = $("<img>");
                image.attr('src', compendium_data[i].image);
                $("#" + i).append(name, description, imageHolder);
                $("#img" + i).append(image);
            }
        });
    }
    getCategory("creatures");
    $("#creatures").click(() => {
        getCategory("creatures");
    });
    $("#equipment").click(() => {
        getCategory("equipment");
    });
    $("#materials").click(() => {
        getCategory("materials");
    });
    $("#monsters").click(() => {
        getCategory("monsters");
    });
    $("#treasure").click(() => {
        getCategory("treasure");
    });
})

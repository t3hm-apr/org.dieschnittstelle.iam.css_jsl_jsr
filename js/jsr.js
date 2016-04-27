/**
 * Created by master on 01.03.16.
 * @author jk, Alexander Preugschat, Benjamin Schmidt
 */

var names = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.".split(" ");

function refresh() {

    var ulNode = document.getElementsByTagName("ul")[0];
    while (ulNode.firstChild) {
        ulNode.removeChild(ulNode.firstChild);
    }

    loadNewItems();
}

function getRandomName() {
    var idx = Math.floor((Math.random() * names.length) + 1);
    return names[idx];
}
function addRandomItem() {

    var name = getRandomName();

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var month = monthIndex < 10 ? "0" + monthIndex : "" + monthIndex;
    var year = date.getFullYear();

    var dateString = day + "." + month + "." + year;

    var numOfTags = Math.floor((Math.random() * 10) + 1);

    createListElementForContentItem({
        "name": name,
        "owner": "lorempixel,com",
        "added": dateString,
        "numOfTags": numOfTags,
        "src": "http://lorempixel.com/100/100"
    });
}

function deleteItem(item) {
    var ulNode = document.getElementsByTagName("ul")[0];
    ulNode.removeChild(item);
}

function loadNewItems() {

    // we initiate an xmlhttprequest and read out its body
    xhr("GET","data/listitems.json",null,function(xhr) {
        var textContent = xhr.responseText;
        console.log("loaded textContent from server: " + textContent);
        var jsonContent = JSON.parse(textContent);

        // we assume jsonContent is an array and iterate over its members
        jsonContent.forEach(function(contentItem){

            // console.log(contentItem);

            createListElementForContentItem(contentItem);
        });

    });

}
// <li>
//     <div class="container">
//         <div class="list_item_image  list_1">
//             <div class="button dots"></div>
//         </div>
//         <div class="list_item_content">
//             <div>
//                 <div style="float:right">22.02.2016</div>
//                 <div class="list_item_url">lorempixel.com</div>
//             </div>
//             <div class="list_item_title">
//                 M1
//             </div>
//             <div>
//                 <div class="button dots"></div>
//                 <div class="button play">0</div>
//             </div>
//         </div>
//     </div>
// </li>
function createListElementForContentItem(item) {

    console.log("== ADDING NEW ITEM ==");

    var li = document.createElement("li");

    var containerDiv = appendDivWithClassesAndContent(li, ["container"]);

    // list item image
    var listItemImageDiv = appendDivWithClassesAndContent(containerDiv, ["list_item_image"]);
    listItemImageDiv.style.backgroundImage = "url('"+item.src+"')";
    appendDivWithClassesAndContent(listItemImageDiv, ["button", "dots"]);

    // list item content
    var listItemContentDiv = appendDivWithClassesAndContent(containerDiv, ["list_item_content"]);

    var div = appendDivWithClassesAndContent(listItemContentDiv);
    appendDivWithClassesAndContent(div, ["right"], item.added);
    appendDivWithClassesAndContent(div, ["list_item_url"], item.owner);

    appendDivWithClassesAndContent(listItemContentDiv, ["list_item_title"], item.name);

    div = appendDivWithClassesAndContent(listItemContentDiv);
    appendDivWithClassesAndContent(div, ["button", "dots"]);
    appendDivWithClassesAndContent(div, ["button", "play"], item.numOfTags);


    // add the element to the list
    document.getElementsByTagName("ul")[0].appendChild(li);

}

function appendDivWithClassesAndContent(element, classes, content) {

    console.log("adding: div " + classes + " / " + content + " to element " + element.tagName);

    if(element) {
        var div = document.createElement("div");
        if(classes && classes.length >0) {
            for(var i = 0; i < classes.length; i++) {
                div.classList.add(classes[i]);
            }
        }
        if(content || content === 0) {
            div.textContent = content;
        }

        element.appendChild(div);
        return div;
    }
}
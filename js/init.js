/**
 * @author Alexander Preugschat
 */
window.onload = function() {
    console.log('init');
    
    loadNewItems();

    var toggleButton = document.getElementById("toggleButton");
    toggleButton.onclick = function() {
        toggleView();
    };

    var refreshButton = document.getElementById("refresh");
    refreshButton.onclick = function () {
        refresh();
    };

    var addButton = document.getElementById("addItem");
    addButton.onclick = function () {
        addRandomItem();
    };
};
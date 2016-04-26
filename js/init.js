/**
 * Created by alexander.preugschat on 26.04.16.
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
};
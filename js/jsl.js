/**
 * Created by master on 01.03.16.
 */
var listenersSet;

// a function that reacts to the selection of a list item
function onListItemSelected(event) {
    // check in which phase we are
    if (event.eventPhase == 3) {
        // a helper function that looks up the target li element of the event
        function lookupEventTarget(el) {
            if (el.tagName.toLowerCase() == "li") {
                return el;
            }
            else if (el.tagName.toLowerCase() == "ul") {
                console.warn("lookupEventTarget(): we have already reached the list root!");
                return null;
            }
            else if (el.parentNode) {
                return lookupEventTarget(el.parentNode);
            }
        }

        // lookup the target of the event
        var eventTarget = lookupEventTarget(event.target);
        if (eventTarget) {
            // from the eventTarget, we find out the title of the list item, which is simply the text content of the li element
            showToast("selected: " + eventTarget.textContent);
        }
        else {
            showToast("list item target of event could not be determined!");
        }
    }
}

function toggleListeners() {


    // we set an onclick listener on the list view and check from which item the event was generated
    // we also set a listener on the '+'-button that loads content from the server!
    var ul = document.getElementsByTagName("ul")[0];
    var newItem = document.querySelector(".new-item");

    if (listenersSet) {
        newItem.removeEventListener("click",loadNewItems);
        ul.removeEventListener("click", onListItemSelected);
        showToast("event listeners have been removed");
        listenersSet = false;
    }
    else {
        newItem.addEventListener("click",loadNewItems);
        ul.addEventListener("click", onListItemSelected);
        showToast("event listeners have been set");
        listenersSet = true;
    }
}

/* show a toast and use a listener for transitionend for fading out */
function showToast(msg) {
    console.log("showToast(): using transitionend listener");
    var toast = document.querySelector(".toast");
    toast.textContent =  msg;
    toast.classList.toggle("active");
    /* initiate fading out the toast when the transition has finished nach Abschluss der Transition */
    toast.addEventListener("transitionend", fadeoutToast);
}


/* trigger fading out the toast and remove the event listener  */
function fadeoutToast() {
    console.log("fadeoutToast()");
    var toast = document.querySelector(".toast");
    toast.classList.toggle("active");
    /* remove tranistionend listener */
    toast.removeEventListener("transitionend", fadeoutToast);
}

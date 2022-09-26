
// PAGE CHANGE DETECTION CODE
// ========================================================================================================
// I do not understand how this bit works but it makes it possible to detect page changes.
// https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
let oldPushState = history.pushState;
history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
};
let oldReplaceState = history.replaceState;
history.replaceState = function replaceState() {
    let ret = oldReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
};
window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
});

// PAGE CHANGE EVENT LISTENER CODE
// ========================================================================================================
window.addEventListener('locationchange', function() {
    console.log('Page changed to : ' + window.location.pathname);
    
    if (window.location.pathname.includes('/prime/job/view')) {
        console.log('');
    }
    // get tabs
    Object.fromEntries(Object.entries(localStorage).filter(([k]) => k.includes('primeTabs-')));
});



// ========================================================================================================
// ########################################################################################################
// ========================================================================================================



// BASE DIV ELEMENT
// ========================================================================================================
// create element
const myElement = document.createElement('div');
// add to very top of page body
document.body.prepend(myElement);
// init element expanded var to false
var expanded = false;
// style element
myElement.style.backgroundColor = '#555';
myElement.style.position        = 'fixed';
myElement.style.width           = '150px';
myElement.style.height          = '50px';
myElement.style.zIndex          = '99999';
myElement.style.top             = '0';
myElement.style.left            = ((window.innerWidth / 2) - 75) + 'px';
myElement.style.cursor          = 'pointer';

// FORM ELEMENT
// ========================================================================================================
// create form and input elements
form = document.createElement('form');
input = document.createElement('input');
click = document.createElement('input');
// set element attributes
form.hidden = true;
input.type = 'text';
click.type = 'button';
click.value = 'Send';
// set style
form.style.margin = '25px';
input.style.width = '100%';
input.style.height = '30px';
click.style.width = '100%';
click.style.height = '30px';
click.style.marginTop = '15px';

// add elements to form
_ = document.createElement('p'), _.style.color = '#fff', _.append(document.createTextNode('Send AJAX:'));
form.append(_);
form.append(input);
form.append(click);
// add form to base div
myElement.append(form);

// FORM CLICK FUNCTION
// ========================================================================================================
click.onclick = function () {
    $.ajax({
        url: input.value,
        dataType:"json",
        type:'GET',
        beforeSend:r=>r.setRequestHeader('authorization', 'Bearer ' + JSON.parse(localStorage.prime).token['access_token']),
        complete:d=>console.log(d.responseJSON)
    });
}

// BASE DIV ON CLICK FUNCTION
// ========================================================================================================
// add click function
myElement.onclick = function (event) {
    console.log(event)
    if (expanded & event.path[0] == myElement) {
        // close box if expanded
        myElement.style.transition = '0.5s';
        myElement.style.width  = '150px';
        myElement.style.height = '50px';
        myElement.style.left = ((window.innerWidth / 2) - 75) + 'px';
        form.hidden = true;
        expanded = false;
    } else {
        // open box if closed
        myElement.style.transition = '0.5s';
        myElement.style.width  = '400px';
        myElement.style.height = '600px';
        myElement.style.left = ((window.innerWidth / 2) - 200) + 'px';
        form.hidden = false;
        expanded = true;
    }
}







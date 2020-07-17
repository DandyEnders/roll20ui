
alert('startcontent');

// Taken from https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script;
function injectPageScript(url) {
    const s = document.createElement('script');
    s.src = url;
    s.charset = "UTF-8";
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}
// Taken from https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script;
function injectPageScript(url) {
    const s = document.createElement('script');
    s.src = url;
    s.charset = "UTF-8";
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}

function injectCSS(css) {
    const s = document.createElement('style');
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
}
function sendCustomEvent(name, data=[]) {
    if (getBrowser() === "Firefox")
        data = cloneInto(data, window);
    const event = new CustomEvent("Beyond20_" + name, { "detail": data });
    document.dispatchEvent(event);
}

function addCustomEventListener(name, callback) {
    const event = ["Beyond20_" + name, (evt) => 
    {
        const detail = evt.detail || [];
        callback(...detail)
    }, false];
    document.addEventListener(...event);
    return event;
}


chrome.runtime.onMessage.addListener(function (request) {

    switch(request){
        case "hide_card":
            $('[class="deckhands"]').hide();
            break;
        case "show_card":
            $('[class="deckhands"]').show();
            break;

        // TODO: Possibilities for deprecation: the sheets do not persists
        case "set_character_sheet":
            break;
        case "open_character_sheet":
            break;

        case "GetHP":
            ///, [request.character.name, request.character.hp, request.character["max-hp"], request.character["temp-hp"]]
            alert('GetHP');
            sendCustomEvent("UpdateHP");
            alert('GetHP2');
            break;
    }
 })

injectPageScript(chrome.runtime.getURL('content.js'));
alert('injectcomplete');

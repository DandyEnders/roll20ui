alert('inject succeess');

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

E = new Proxy({}, {
    get: function (obj, name) {
        return new Proxy(function () {}, {
            apply: (target, thisArg, argumentsList) => {
                const attributes = argumentsList[0] || {};
                const children = argumentsList.slice(1);
                const e = document.createElement(name);
                for (const [name, value] of Object.entries(attributes))
                    e.setAttribute(name, value);
                for (const child of children)
                    e.append(child);
                return e;
            }
        });
    }
});

function updateHP() 
{
    alert('GetHP3');
    /*
    var character_name = prompt("당신의 캐릭터 시트 이름을 넣어주세요.");
    alert(character_name);

    // TODO: Deal with prompt cancellation.
    var character_id_list = $('[id="speakingas"]:contains(' + character_name + ')').children();
    var character_id;

    for (i = 0; i < character_id_list.length; i++){
        if (character_id_list[i].text === character_name){
            character_id = character_id_list[i].value;
        }
    }
    alert(character_id);

    // From "player|-LxNLh888PjHCsXhBoo0" remove "character|", 10 characters.
    character_id = character_id.slice(10)
    alert(character_id);

    var name = character_id;

   
    character = window.Campaign.characters.find((c) => c.attributes.name.toLowerCase().trim() === name);
    if (character) 
    {
        alert("Found character : ", character);

        const hp = character.attribs.find((a) => a.attributes.name === "hp");
        if (hp) {
            //console.log("Found attribute : ", hp);

       
            hp.set("current", String(current));
            hp.set("max", String(total));
            hp.save();
            character.updateTokensByName("hp", hp.id);
           
            
           alert(hp);

        }

 
        const temp_hp = character.attribs.find((a) => a.attributes.name === "hp_temp");
        if (temp_hp) {
            //console.log("Found attribute : ", temp_hp);
            if (temp_hp.attributes.current != String(temp)) {
                const value = temp != 0 ? String(temp) : "";
                temp_hp.set("current", value);
                temp_hp.set("max", value);
                temp_hp.save();
                character.updateTokensByName("hp_temp", temp_hp.id);
            }
        }
       
    }
    */
}


// Global
// var my_character_name = "";

function disconnectAllEvents() {
    for (let event of registered_events)
        document.removeEventListener(...event);
}

var registered_events = [];
registered_events.push(addCustomEventListener("UpdateHP", updateHP));
registered_events.push(addCustomEventListener("disconnect", disconnectAllEvents));
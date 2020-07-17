document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[id="hide_card"]').addEventListener('click', 
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, "hide_card");
            }
        )
    }
}, false)

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[id="show_card"]').addEventListener('click', 
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, "show_card");
            }
        )
    }
}, false)

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[id="set_character_sheet"]').addEventListener('click', 
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, "set_character_sheet");
            }
        )
    }
}, false)

// TODO: Disable "open character sheet" if no sync data is available.
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[id="open_character_sheet"]').addEventListener('click', 
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, "open_character_sheet");
            }
        )
    }
}, false)

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('[id="GetHP"]').addEventListener('click', 
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, "GetHP");
            }
        )
    }
}, false)
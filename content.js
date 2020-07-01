
// Global
// var my_character_name = "";

// Listener
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

            chrome.storage.sync.set({
                "name": character_name,
                "id": character_id
            }, function() {});

            break;
        case "open_character_sheet":
            // null => get all
            chrome.storage.sync.get(['id'], function(items) {
                console.log(items);
                console.log(items['id']);
                
                // Press character sheet
                var character_elem = $('[class="journalitem dd-item character  ui-draggable"][data-itemid=' + items['id'] + ']');
                
                if (character_elem.length){
                    character_elem.click();
                }else{
                    // TODO: Deal with situtation when there is no character sheet.
                    $('[class="journalitem dd-item character  "][data-itemid=' + items['id'] + ']').click();
                }

                // Press Attribute & Abilities tab 
                // TODO: Check for possibility that this would not click due to delay.
                var intervalEntity;
                var attribCount = $('.attrib').length
                setTimeout(function() {
                    intervalEntity = setInterval(function(){
                        // Click Attribute & Abilities tab.
                        $('[data-tab="attributesabilities"]').click();
                        // If Attributes were loaded and the size of array changed,
                        if ((attribCount) != ($('.attrib').length)){
                            clearInterval(intervalEntity);
                            setTimeout(function() {
                                // Press exit button to close the sheet
                                $('[class="ui-icon ui-icon-closethick"]').click();
                            }, 1000);
                        }
                    }, 2000)
                }, 15000);
                
                
                
                
                
                console.log($('[class="attrib"]:contains(hp)').find('[class="current"]'));
            });
            break;
        
    }
 })

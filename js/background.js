//Background functions

function get(name, def) {
    var val = localStorage[name];
    if (typeof val != 'undefined') {
        return JSON.parse(val);
    }
    if (typeof def != 'undefined') {
        set(name, def);
        return def;
    }
    return null;
}

function set(name, val) {
    localStorage[name] = JSON.stringify(val);
    return val;
}

function update(tabId) {
    chrome.tabs.get(tabId, function(Tab) {
        var enabled = isReaderEnabled(Tab.url);
        if (enabled) {
            var icon = 'icon-enabled.png';
             //enableSleek();
        } else {
            var icon = 'icon-disabled.png';
        }

        chrome.pageAction.setIcon({
            'tabId': Tab.id,
            'path': icon
        });

        chrome.pageAction.show(Tab.id);


    });
}

function isReaderEnabled(url) {
    return get('reader@'+url);
}

function enableReader(url) {
    return set('reader@'+url, true);
}

function disableReader(url) {
    return set('reader@'+url, false);
}

function toggleReader(url) {
    if (isReaderEnabled(url) == true) {
        disableReader(url);
    } else {
        enableReader(url);
    }
}


chrome.pageAction.onClicked.addListener(function(Tab) {
    toggleReader(Tab.url);
    update(Tab.id);
});

chrome.tabs.onSelectionChanged.addListener(update);

chrome.tabs.onUpdated.addListener(update);

chrome.tabs.getSelected(null, update);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
});




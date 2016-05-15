$(function () {
    'use strict';
    chrome.storage.sync.get({config: {}}, function (storage) {
        for (let item in bbt_config) {
            if (storage.config[item]) {
                bbt_config[item].action();
            }
        }
    });
});

$(function () {
    'use strict';

    $('#all').on('change', function () {
        $('#items input').prop('checked', $(this).prop('checked'));
    });
    var checkbox_helper = function () {
        $('#all').prop('checked', $('#items input:not(:checked)').length == 0);
    };

    /**
     * Restore configurations and build form
     */
    chrome.storage.sync.get({config: {}}, function (storage) {
        for (let item in bbt_config) {
            $('<label><input type="checkbox" />' + bbt_config[item].description + '</label>')
                .data('id', item)
                .appendTo($('#items'))
                .find('input')
                .prop('checked', storage.config[item]);
        }

        $('#items input').on('change', checkbox_helper).change();
    });

    /**
     * Save
     */
    $('button').on('click', function () {
        var config = {};
        $('#items label').each(function () {
            config[$(this).data('id')] = $(this).find('input').prop('checked');
        });

        chrome.storage.sync.set({config}, function () {
            $('#status').show().text('保存しました').delay(750).fadeOut();
        });

        return false;
    });
});

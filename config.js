var bbt_config = (function () {
    'use strict';

    return {
        disable_project_accordion: {
            description: 'ダッシュボードのプロジェクト一覧から各機能へのリンクを最初から表示する (WIP)',
            action: function () {
              $(function() { 
                  var script = document.createElement('script');
                  var str = 'jQuery("li.Project").unbind("mouseenter").unbind("mouseleave")';
                  script.innerHTML = str;
                  document.body.appendChild(script);

                $('.ProjectNavi').show();
              });
            }
        },
        remove_textbox_in_repository_list: {
            description: 'リポジトリ一覧画面で絞り込み検索ボックスを表示しない',
            action: function () {
                $('.Filter-box.Filter-repository').remove();
            }
        },
        custom_global_header: {
            description: 'グローバルヘッダにリポジトリへのリンクを追加',
            action: function () {
                for (let repo of ['DEV/main', 'DEV/admin']) {
                    $('<li><a href="/git/' + repo + '">' + repo + '</a></li>').appendTo('#global > ul.Global-menu');
                    $('<li><a href="/git/' + repo + '/pullRequests?q.statusId=1">PR</a></li>').appendTo('#global > ul.Global-menu');
                    $('<li><a href="/git/' + repo + '/network/">NW</a></li>').appendTo('#global > ul.Global-menu');
                }
            }
        },
        add_pullreq_from_ticket: {
            description: '課題ページにプルリクエスト作成ボタンを追加',
            action: function () {
                var btn = $('<button class="Btn-gray">追加する (admin)</button>')
                        .css({'margin': '1em', 'padding': '1em'})
                        .on('click', function () {
                            location.href = '/git/DEV/admin/pullRequests/add/master...feature/' + $('.issue-type-name + strong').text();
                        });
                $('#pullRequestList').append(btn);
            }
        },
        keyboard_shortcut: {
            description: 'キーボードショートカットを使う',
            action: function () {
                Mousetrap.bind('g m p', function() { location.href = '/git/DEV/main/pullRequests?q.statusId=1'; });
                Mousetrap.bind('g m n', function() { location.href = '/git/DEV/main/network/'; });
                Mousetrap.bind('g a p', function() { location.href = '/git/DEV/admin/pullRequests?q.statusId=1'; });
                Mousetrap.bind('g a n', function() { location.href = '/git/DEV/admin/network/'; });
                Mousetrap.bind('d d', function() { location.href = '/'; });

                Mousetrap.bind('.', function() { $('.SeeUpdated a').click(); });
            }
        },
    };
})();

(function($) {
    $(function() {
        $('#searchGranularity').chosen({
            disable_search: true
        }).change(function(event) {
            toggleSearchInput($(this).val());
        });

        // add placeholders for search inputs
        $('.lia-component-common-widget-search-bar .lia-search-input-message').attr('placeholder', 'Search');
        $('.lia-component-common-widget-search-bar .lia-search-input-tkb-article').attr('placeholder', 'Search Knowledge Base');
        $('.lia-component-common-widget-search-bar .lia-search-input-user').attr('placeholder', 'Search Users');

        toggleSearchInput($('#searchGranularity').val());
        $('#searchautocompletetoggle').show();
    });

    function toggleSearchInput(value) {
        $('.lia-component-common-widget-search-bar  .search-input').hide().addClass('lia-js-hidden');
        switch (value) {
            case 'tkb|tkb':
                $('.lia-component-common-widget-search-bar .lia-search-input-tkb-article').show().removeClass('lia-js-hidden');
            break;

            case 'user|user':
                $('.lia-component-common-widget-search-bar .lia-search-input-user').show().removeClass('lia-js-hidden');
            break;

            case 'ubnt|community':
                $('.lia-component-common-widget-search-bar .lia-search-input-message').show().removeClass('lia-js-hidden');
            break;

            default:
                $('.lia-component-common-widget-search-bar .lia-search-input-message').show().removeClass('lia-js-hidden');
            break;
        }
    }

    function showUserPopover() {
        var popup = $('.ubnt-popover');
        popup.show();
        return false;
    }

    function hideUserPopover() {
        var popup = $('.ubnt-popover');
        popup.hide();
    }

    $('.ubnt-popover').click( function(e) {
        e.stopPropagation();
    });

    $('.ubnt-user-button').click(showUserPopover);
    $(window).click(hideUserPopover);

    // Disable first and last name profile fields
    $('#profilename_first').attr('readonly', true);
    $('#profilename_last').attr('readonly', true);

    if ($('.mark-community-read-link').length > 0) {
        var forumread = $('.mark-community-read-link').attr('href');
        $('.ubnt-markallread').attr('href',forumread);
    } else {
        $('.ubnt-toolbar-markread').addClass('disabled');
    }
    if ($('body').hasClass('CategoryPage')) {
        var categoryread = $('.mark-category-read-link').attr('href');
        $('.ubnt-markcategoryread').attr('href',categoryread);
    }

    // to the top
    var $topButton = $('#ToTheTopButton');
    var $document = $(document);
    $document.scroll(toggleTopButton);

    function toggleTopButton() {
        $topButton.toggleClass('visible', ($document.scrollTop() > $(window).height() * 0.2));
    }

    toggleTopButton();

    $topButton.on('click', function(e){
        e.preventDefault();
        $('html, body').stop(true, true).animate({ scrollTop: 0 }, 500);
    });

    // Google Analytics event tracking (use data-ga-* attributes on anchors)
    window._gaq = typeof window._gaq !== 'undefined' ? window._gaq : [];

    $('a[data-ga-category][data-ga-action]').on('click', function (event) {
        var $this = $(this);
        window._gaq.push(['_trackEvent', $this.data('ga-category'), $this.data('ga-action'), $this.data('ga-label'), $this.data('ga-value')]);

        // This implementation is specified in the GA docs for outbound links
        // https://support.google.com/analytics/answer/1136920?hl=en
        setTimeout(function () {
            document.location.href = $this.attr('href');
        });
        return false;
    });

    // Add Kudos to message
    $('.ubnt-kudos-give').click( function() {
        var $this = $(this);
        var id = $this.attr('id');
        var url = "/restapi/vc/messages/id/" + id + "/kudos/give";
        var request = $.ajax({
            // type: "POST",
            url: url,
            success: function() {
                var $current_kudos = $('.ubnt-kudos-count');
                $('.ubnt-kudos-count').text( Number($current_kudos.html()) + 1 );
                $('.ubnt-kudos-give-container').html('<span class="ubnt-kudos-give-disabled">Kudos Given!</span>');
            }
        });

    });

})(jQuery);
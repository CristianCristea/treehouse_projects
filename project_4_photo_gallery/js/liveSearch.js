$(function () {
    $("#search").keyup(function () {
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(),
            count = 0;
        // Loop through the menu list
        $("#image-list a").each(function () {
            // If the list item does not contain the text phrase fade it out
            if ($(this).data('title').search(new RegExp(filter, "i")) < 0) {
                $(this).removeClass("foundItem").addClass("notFoundItem");
                $("body").removeClass("overlaySearch").addClass("overlaySearch");
                // Show the list item if the phrase matches and increase the count by 1
            } else {
                $("body").removeClass("overlaySearch").addClass("overlaySearch");
                // $(this).show();
                $(this).removeClass("notFoundItem").addClass("foundItem");
                count++;
            }
        });

        // Remove overlay
        if ( !($(this).val()) ) {
          $("body").removeClass("overlaySearch");
          $("a").removeClass("notFoundItem");
          $(this).removeClass("text-white");
        } else {
          $(this).addClass("text-white");
        }

        // Update the count
        if (count == 1) {
            $("#filter-count").text(count + " result for: " + filter);
        } else if (count > 0) {
            $("#filter-count").text(count + " results for: " + filter);
        }
         else {
            $("#filter-count").text("No results for: " + filter);
        }
        if (filter === "") {
            $("#filter-count").text("");
        }
    });
});


  
$(function() {
   $.getJSON('data/product.json', function(data)
   {
      var output = "";
      for(var i in data.products)
      {
         output +=
         "<div class='col xl3 l4 m6 s12'>"
            + "<div class='card hoverable small'>"
               + "<div class=card-image>"
                  + "<img src=" + data.products[i].image + " alt=Product>"
                  + "<span class=card-title>" + data.products[i].title + "</span>"
               + "</div>"
               + "<div class=card-content>"
                  + "<p>" + data.products[i].description + "</p>"
               + "</div>"
               + "<div class=card-action>"
                  + "<a href=" + data.products[i].reference + ">Link blog</a>"
               + "</div>"
            + "</div>"
         + "</div>";
      }
      $("#card-product").append(output);
   });
});

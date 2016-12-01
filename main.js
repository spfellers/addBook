var fs = require("fs");

fs.readFile('./public/index.html', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
   }
   console.log(data.toString());
});

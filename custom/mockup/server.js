
// simple node webserver
const
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path');

var server = http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
    console.log("Accesslog: " + filename);

    fs.stat(filename, function(err, stats) {
        if (err) {
            response.writeHead(404);
            response.write("Can't find " + uri);
            response.end();
        } else {
            if (stats.isDirectory()) {
                filename = filename + "/index.html";
            }

            fs.readFile(filename, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(404);
                    response.write("Can't find " + uri);
                    response.end();
                } else {
                    response.writeHead(200);
                    response.write(file, 'binary');
                    response.end();
                }
            });

        }


    });
});

server.listen(8080, function(){
    console.log('issue-treacker mockup server ready!');
});

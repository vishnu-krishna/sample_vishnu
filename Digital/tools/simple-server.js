'use strict';

const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'buildDir', alias: 'b', type: String },
    { name: 'port', alias: 'p', type: Number }
];

const serverOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt')
};

const options = commandLineArgs(optionDefinitions);
const proxy = require('http-proxy-middleware');
const app = express();

app.locals.title = `AGL Simple Server`;

console.log(`
               \`.-.
               .:++        \`
               .osy\`      :/-.
   \`\`.\`        \`syy-     :so+\`
   .://-        syy/    -yyy:
    -+sso-      +yys   \`syy+    \`\`\`
     \`/syy+\`    :yyy\`  oyys\`  \`-o+/.
       -oyys:\`  .yhh. :hhy. \`-oyys:\`
         :syys-  .-.  \`::. \`syys/\`
          \`+yhy.            /o/.
            .-.
 \`\`\`\`\`\`
.:/oosssoo+/:\`
\`.-:/++ossyhh:
        \`\`\`\`\`
`);

console.log(`
AGL - NodeJS Express Simple Server for AOT and Service Worker Checks
`);

const buildDir = options.buildDir || '/../dist/aot';
console.log(`Using build directory: ${buildDir}`);

const port = options.port || 8080;
console.log(`Using port: ${port}`);

https.createServer(serverOptions, app).listen(port);


// Serve static files
app.use((req, res, next) => {
    var now = new Date().toLocaleTimeString();
    console.log(``);
    console.log(`${now}:`);
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static(__dirname + buildDir)); // dist/aot
app.use(express.static(path.join(__dirname, buildDir, '..', '..', 'server-ts'))); // mock data

// Route to the index.html (catch-all)
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + buildDir + '/index.html'));
});

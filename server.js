#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    accessLog: {
        // Check out the file-stream-rotator docs for parameters
        fileStreamRotator: {
            filename: '/usr/local/applogs/access-%DATE%.log',
            frequency: 'daily',
            date_format: 'YYYY-MM-DD',
            verbose: false
        },

        // Check out the morgan docs for the available formats
        morgan: {
            format: [
                ':remote-addr',
                '-',
                ':remote-user',
                '[:date[clf]]',
                '":method :url HTTP/:http-version"',
                ':status',
                ':res[content-length]',
                ':response-time'
            ].join(' ')
        }
    }
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
server.use(require('prerender-access-log'));


server.start();

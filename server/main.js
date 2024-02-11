import http from 'http'
import data from './data.json' with { type: "json" }

http.createServer((request, response) => {
    console.log("nice")
    response.setHeader("Access-Control-Allow-Origin", "*");
    if(request.url == '/services'){
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(data))
        response.statusCode = 200
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }
} ).listen(3000)
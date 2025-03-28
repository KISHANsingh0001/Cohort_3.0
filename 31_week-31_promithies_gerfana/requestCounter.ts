import client from "prom-client"
// creating our first matrix which count the http request 
export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'] // dimension only make sense if it has no of limited values otherwise it will create infinite rows
});
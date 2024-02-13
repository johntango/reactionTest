let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let port = 4000;
app.use(bodyParser.json()); // support json encoded bodies
// cors

let data = [99999];
let fastest = 99999;
app.use(express.static(__dirname + '/public'));
let root = path.resolve(__dirname, 'public');
app.get('/', async(req, res) => {
    res.sendFile('block.html', { 'root': root });
});
app.post('/set', async (req, res) => {
    let mytime = parseInt(req.body.mytime);
    data.push(mytime);
    let fastest = Math.min(...data);
    console.log("fastest:" + fastest);
    console.log("all data:" + data);
    res.json({fastest:fastest,mytime:mytime})
});
app.get('/get', async (req, res) =>{
    res.send(JSON.stringify(data));
});
app.get('/fastest',async(req,res)=>{
    // need to return both fastest and last recorded time
    let response = {fastest:fastest,mytime:data[data.length-1]}
    res.json(JSON.stringify(response))
})

app.listen(port, () => console.log(`Reaction app listening on port ${port}!`));
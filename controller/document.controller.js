const db = require("../db");
const { spawn } = require("child_process");

class documentController {

    async uploader(req, res) {

        let dataToSend;
        const python = spawn("python", ["public/script/file.py", `tmp/${req.file.filename}`]);
    
        python.stdout.on("data", function (data) { 
            dataToSend = data.toString();
        });
    
        python.on("close", (code) => {
            console.log(`child process exited with code  ${code}`);
            res.send(dataToSend);
        });
    
        python.stderr.on("data", (data) => {
            console.error("err: ", data.toString());
        });
    
        python.on("error", (error) => {
            console.error("error: ", error.message);
        });
    }


    async getCalculateData(req, res) {
        const publication = await db.query(
            'SELECT * FROM documents ORDER BY id DESC LIMIT 1;'
        );
        res.json(publication.rows);
    } 
}


module.exports = new documentController();
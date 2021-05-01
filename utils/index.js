const fs = require('fs');

module.exports = {
    writeB64Image(url, out) {
        let base64Data = url.replace(/^data:image\/png;base64,/, "");

        if (Buffer.from(base64Data, 'base64').toString('base64') !== base64Data)
        {
            throw "Invalid Base64 data";
        }
        fs.writeFile(out, base64Data, 'base64', (err) => {
            if (err)
            {
                console.error(err);
                throw err;
            }
        });
    },
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    cleanUpFile(path) {
        fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
            }
        });
    }
}
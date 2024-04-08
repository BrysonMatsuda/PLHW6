const fs = require('fs');
class Controller{
    constructor(){
        this.categories = [];
    }

    getJSONCategories() {
        fs.readFile('web/www/hw6/connections.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }
            const jsonData = JSON.parse(data);
            const resultArray = Object.entries(jsonData).map(([name, category]) => ({
                name,
                category
            }));
            this.categories = resultArray;
            console.log(this.categories);
            return resultArray;
        });
    }
}

const controller = new Controller();
controller.getJSONCategories();
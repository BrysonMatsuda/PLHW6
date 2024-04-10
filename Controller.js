class Controller{
    constructor(){
        this.categories = [];
        this.totalguesses = 0;
        this.currentgameguesses = 0;
        this.winstreak = 0;
        this.numgamesplayed = 1;
        this.numgameswon = 0;
    }

    setUpNewGame(newCategories){
        this.displayWords(newCategories);
    }

    displayWords(categoriesData){
        var table = document.getElementById("categoriesTable");
        table.innerHTML = "";
        let categories = categoriesData.categories;
        this.categories = categories;
        let allWords = categories.flatMap(category => category.words);
        allWords.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            let row = table.insertRow();
            for (let j = 0; j < 4; j++) {
                let index = i * 4 + j;
                let word = allWords[index];
                let cell = row.insertCell();
                cell.textContent = word;
            }
        }
    }

    handleShuffle(){
        var table = document.getElementById("categoriesTable");
        table.innerHTML = "";
        let categories = this.categories;
        let allWords = categories.flatMap(category => category.words);
        allWords.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            let row = table.insertRow();
            for (let j = 0; j < 4; j++) {
                let index = i * 4 + j;
                let word = allWords[index];
                let cell = row.insertCell();
                cell.textContent = word;
            }
        }
    }
    
}

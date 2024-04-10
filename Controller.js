class Controller{
    constructor(){
        this.categories = [];
        this.totalguesses = 0;
        this.currentgameguesses = 0;
        this.winstreak = 0;
        this.numgamesplayed = 1;
        this.numgameswon = 0;
        this.currentGuessArray = [];
    }

    setUpNewGame(newCategories){
        this.displayWords(newCategories);
    }

    updateForm(word){
        if(this.currentGuessArray.includes(word)){//user is deselecting the word
            //https://www.w3schools.com/jsref/jsref_filter.asp
            this.currentGuessArray = this.currentGuessArray.filter(item => item !== word);
        }
        else{//user is selecting the word
            this.currentGuessArray.push(word);
        }
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
                cell.addEventListener('click', () => {
                    cell.classList.toggle('highlighted'); //https://www.w3schools.com/howto/howto_js_toggle_class.asp
                    this.updateForm(word);
                });
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

    processGuess(){

        alert(this.currentGuessArray);
    }
    
}

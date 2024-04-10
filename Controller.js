class Controller{
    constructor(){
        this.categories = [];
        this.totalguesses = 0;
        this.currentgameguesses = 0;
        this.avgnumguesses = 0;
        this.winstreak = 0;
        this.numgamesplayed = 1;
        this.numgameswon = 0;
        this.currentGuessArray = [];
        this.pastGuessArray = [];
        this.currentCategories = [];//going to have words taken out of it to take words out of table
        this.matchCountTotal = 0;
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
        this.currentCategories = categories; //gets set on a new game, then gets word/cats taken out of it on a correct guess
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
        var guesstable = document.getElementById("guessTable");
        guesstable.innerHTML = "";
        if(this.matchCountTotal != 4){
            this.winstreak = 0;
            this.avgnumguesses = this.totalguesses / this.numgamesplayed;
            document.getElementById("winstreak").textContent = this.winstreak;
            document.getElementById("avgnumguesses").textContent = this.avgnumguesses;
        }
        this.matchCountTotal = 0;
    }

    displayWordsNotNewGame(categoriesData){
        var table = document.getElementById("categoriesTable");
        table.innerHTML = "";
        let categories = categoriesData;
        //this.categories = categories;
        let allWords = categories.flatMap(category => category.words);
        allWords.sort(() => Math.random() - 0.5);
        for (let i = 0; i < categories.length; i++) {
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
        let categories = this.currentCategories;
        let allWords = categories.flatMap(category => category.words);
        allWords.sort(() => Math.random() - 0.5);
        for (let i = 0; i < categories.length; i++) {
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

    processGuess(){
        if(this.currentGuessArray.length !== 4){
            alert("You must guess exactly 4 words!");
        }
        else{
            this.currentgameguesses += 1;
            document.getElementById("currentgameguesses").textContent = this.currentgameguesses;
            //alert(this.currentGuessArray);
            //alert(this.categories[0].words);
            let currentGuessBuilder = [];
            let maxCount =0;
            
            for(let i=0; i <4; i++){
                //console.log(this.currentCategories[i].words);
                //onsole.log(this.currentGuessArray);
                let currCount = this.arrayEquals(this.currentCategories[i].words, this.currentGuessArray)
                if(currCount == 4){//guess was right!
                    this.matchCountTotal++;
                    currentGuessBuilder = this.currentGuessArray.concat(["Correct! Category: ".concat(this.currentCategories[i].category)]);
                    this.currentCategories.splice(i, 1);//removes the category object that the guess was 
                    break;
                }
                else{
                    if(currCount > maxCount){
                        maxCount = currCount;
                    }
                }
            }
            if(currentGuessBuilder.length == 0){//guess was not right
                if(maxCount >= 2){
                    currentGuessBuilder = this.currentGuessArray.concat(["Incorrect guess, but you had ".concat(maxCount.toString(), " in the same category")]);
                }
                else{
                    currentGuessBuilder = this.currentGuessArray.concat(["Incorrect guess"]);
                }
            }
            this.currentGuessArray = [];
            console.log(currentGuessBuilder);
            this.guessTableInsert(currentGuessBuilder);
            this.displayWordsNotNewGame(this.currentCategories);
        }
        if(this.matchCountTotal == 4){
            alert("YOU WON!");
            this.winstreak++;
            this.numgameswon++;
            this.avgnumguesses = this.totalguesses / this.numgamesplayed;
            document.getElementById("winstreak").textContent = this.winstreak;
            document.getElementById("numgameswon").textContent = this.numgameswon;
            document.getElementById("avgnumguesses").textContent = this.avgnumguesses;
            //put more on ending game here
        }
    }

    guessTableInsert(guessArray){
        var table = document.getElementById("guessTable");
        let row = table.insertRow();
        for(let i=0; i<guessArray.length; i++){
            let cell = row.insertCell();
            cell.textContent = guessArray[i];
        }
    }

    arrayEquals(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return 0;
        }
    
        let matchCount=0;
        for (let i = 0; i < arr1.length; i++) {
            
            if (arr2.includes(arr1[i])) {
                matchCount++;
            }
        }
    
        return matchCount;
    }
    
}

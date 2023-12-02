
let methods ={
    convertToArray(input){ 
        let output =input.split(/\r?\n/)
        return output
    },
    createGameObject(rawGameString){
        function findGameNumber(game){
            let arrayOfCharacters = game.split('')
            let firstDigit = +arrayOfCharacters[5]
            if(!(parseInt(arrayOfCharacters[6])) && arrayOfCharacters[6] != 0){
                return firstDigit;
            } else if(!(parseInt(arrayOfCharacters[7])) && arrayOfCharacters[7] != 0){
                return +`${firstDigit}${arrayOfCharacters[6]}`
            } else return +`${firstDigit}${arrayOfCharacters[6]}${arrayOfCharacters[7]}`
        }
        let gameNumber = findGameNumber(rawGameString);

        function extractInfoString(game){
            let lengthOfGameNumber = String(gameNumber).length
            let indexStart = lengthOfGameNumber + 7;
            return game.slice(indexStart);
        }
           let infoString = extractInfoString(rawGameString)
           let getInfoString = () => infoString;
            let getGameNumber = () => gameNumber;
            let infoArray = infoString.split(/[;,]+/)
            let getInfoArray= () => infoArray;
            let arrayOfArrays = [];
            infoArray.forEach(element => {
                let cleanElement = element.trim()
                let array = cleanElement.split(' ')
                arrayOfArrays.push(array);
            });
            let getArrayOfArrays = () => arrayOfArrays;
            return {getGameNumber, getInfoString, getInfoArray, getArrayOfArrays}    
    },
    isGamePossible(game){
        function isRoundPossible(round){
            let count = +round[0];
            let color = round[1]
            if (count <= 12){
                return true;
            } else if ((count === 13 && color === 'green') || (count === 13 && color === 'blue') ){
                return true;
            } else if (count === 14 & color === 'blue'){
                return true;
            } else return false;
        }
        let isPossible = true
        game.forEach(round => {
            if (isRoundPossible(round) == true){
                return; 
            } else if (isRoundPossible(round) == false){
                isPossible = false;
            }
        });
        return isPossible;
    }
}


let arrayOfGames 
function solution(data){

    data = methods.convertToArray(data);

    arrayOfGames = [];
    data.forEach(element => {
        let gameObj = methods.createGameObject(element);
        arrayOfGames.push({
            marbles: gameObj.getArrayOfArrays(),
            gameNumber: gameObj.getGameNumber()
        })
        
    });
    let possibleGames = [];
    arrayOfGames.forEach(game => {

        if (methods.isGamePossible(game.marbles) == true){
            possibleGames.push(game.gameNumber)
        } else return;
    });
    console.log(possibleGames)
    const sum = possibleGames.reduce((partialSum, a) => partialSum + a, 0);

    return sum;
}

console.log(solution(data))



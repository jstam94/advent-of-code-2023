
function solution(data){

    array = data.split(/\r?\n/);

    arrayOfArrays = [],

    array.forEach(element => {
       let line = element.split('')
       arrayOfArrays.push(line)
    });
 

    let lineAnswerStorage = [];
  arrayOfArrays.forEach(line => {
        let newLine = [];
        line.forEach(character => {
            let number = parseInt(character);
            number ? newLine.push(number) : newLine.push(character);
        });
        let firstDigit = newLine.find((character) => Number.isInteger(character));
        let lastDigit = newLine.findLast((character) =>Number.isInteger(character));
        let lineAnswer = `${firstDigit}${lastDigit}`;
        lineAnswerStorage.push(+lineAnswer)
  });

  const sum = lineAnswerStorage.reduce((partialSum, a) => partialSum + a, 0);
  return sum
}


console.log(solution(data))








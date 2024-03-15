// Please write "npm start" after installing the packages!

// >---A-@-+
//         |
// +-U-+   C
// |   |   |
// s   C---+

// [i][j, j, j, j, j, j, j, j, j]
// [i][                        j]
// [i][j, j, j, j, j,          j]
// [i][j,          j,          j]
// [i][j,          j, j, j, j, j]

const matrix = [
    [">", "-", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["+", "-", "U", "-", "+", " ", " ", " ", "C"],
    ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
    ["s", " ", " ", " ", "C", "-", "-", "-", "+"]
];

class PathMapper {
    constructor(
        private matrix: string[][],
        private path: string[] = [],
        private letters: string[] = []
    ) {}

    pathAndLetters(): {path: string, letters: string} {
        let currentI = 0;
        let currentJ = 0;
        let turn = null;
        let goal = false;
        let cLetter = 0;

        while(!goal) {
            const currentElement = this.matrix[currentI][currentJ];
            this.path.push(currentElement);

            if(currentElement >= "A" && currentElement <= "Z") {
                this.letters.push(currentElement)
            }

            switch(currentElement) {
                case ">":
                    turn = "right";
                    break;
                case "+":
                    if(turn === "right" || turn === "left") {
                        if(currentI > 0 && this.matrix[currentI - 1][currentJ] !== " ") {
                            turn = "up";
                        } else {
                            turn = "down";
                        }
                    } else {
                        if(currentJ > 0 && this.matrix[currentI][currentJ - 1] !== " ") {
                            turn = "left";
                        } else {
                            turn = "right";
                        }
                    }
                    break
                case "|":
                    if(turn === "up" || turn === "down") {
                        if(currentJ > 0 && this.matrix[currentI][currentJ - 1] !== " ") {
                            turn = "left";
                        }
                    }
                    break
                case "C":
                    cLetter++;
                    if(cLetter === 2) {
                        turn = "up"
                    }
                    break;
                case "s":
                    goal = true;
                    break;
            }

            switch(turn) {
                case "right":
                    currentJ++;
                    break;
                case "left":
                    currentJ--;
                    break;
                case "up":
                    currentI--;
                    break;
                case "down":
                    currentI++;
                    break;
            }
        }

        return {path: this.path.join(""), letters: this.letters.join("")};
    }
}

const pathMapper = new PathMapper(matrix);
const result = pathMapper.pathAndLetters();
console.log(result)
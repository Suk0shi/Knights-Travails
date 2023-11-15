function Graph() {
  return {
    //create grid with all nodes and edges
    chessBoard: new Map(),

    addNode(size = 8) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          this.chessBoard.set(`${[i, j]}`, []);
        }
      }
    },

    addEdges(board = this.chessBoard) {
      for (let [location] of board) {
        const locationArr = location.split(",");
        const x = parseInt(locationArr[0]);
        const y = parseInt(locationArr[1]);

        const direction = {
          1: [x + 1, y + 2],
          2: [x + 2, y + 1],
          3: [x + 2, y - 1],
          4: [x + 1, y - 2],
          5: [x - 1, y - 2],
          6: [x - 2, y - 1],
          7: [x - 2, y + 1],
          8: [x - 1, y + 2],
        };
        for (let moveDirection in direction) {
          const move = direction[moveDirection].toString();
          if (board.has(move) && !board.get(location).includes(move)) {
            this.chessBoard.get(location).push(move);
          }
        }
      }
    },

    //figure out traversal
    knightMoves(start, end) {
      const movePath = [];
      const visited = new Set();
      const queue = [];
      //add start as current location and as part of the movePath
      queue.push([start, [start]]);
      while (queue.length > 0) {
        let [current, path] = queue.shift();
        visited.add(current);
        if (current === end) {
          movePath.push(path);
        }
        const neighbors = this.chessBoard.get(current);
        for (let pos of neighbors) {
          if (!visited.has(pos)) {
            queue.push([pos, [...path, pos]]);
          }
        }
      }
      console.log(`Quickest route from ${start} to ${end}`);
      console.log(movePath[0])
      // if you wanted all quickest routes
      // movePath.forEach((element) => console.log(element));
    },
  }
}

const newGraph = new Graph();
newGraph.addNode();
newGraph.addEdges();
newGraph.knightMoves('0,0', '1,2');
newGraph.knightMoves('3,1', '2,2');
newGraph.knightMoves('7,7', '7,6');
newGraph.knightMoves('0,0','7,7')
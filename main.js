import chessjs from 'https://cdn.skypack.dev/chess.js';
import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts";


async function promptString(question) {
    console.log(question);

    for await (const line of readLines(Deno.stdin)) {
        return line;
    }
}


async function main(){
  console.log("\nWelcome to sudden death blind chess!");
  console.log("Play only legal moves or you're out!\n");

  const chess = new chessjs.Chess()
  chess.clear()
  console.log(chess.ascii())
  chess.reset()

  while (!chess.game_over()) {
    const possiblePlayerMoves = chess.moves()
    const playerMove = await promptString("Enter your move:");
    if (!possiblePlayerMoves.includes(playerMove)){
      break;
    }
    chess.move(playerMove)

    const possibleBotMoves = chess.moves()
    const botMove = possibleBotMoves[Math.floor(Math.random() * possibleBotMoves.length)]
    chess.move(botMove)
    console.log(chess.pgn())
  }
  console.log("Game over!")
}


main();
import java.util.Scanner;

class TicTacToe {
  // magic strings
  final static String[] PLAYER_CELLS = {"x", "o"};
  final static String ASK_SIZE_MESSAGE = "Enter size N (N >= 3):";
  final static String ASK_NAME_MESSAGE = "Enter name for Player %d:\n";
  final static String ASK_MOVE_MESSAGE = "%s, choose a box to place an %s into:\n";
  final static String ASK_VALID_MOVE_MESSAGE = "Invalid. %s, choose a valid box to place an %s into:\n";
  final static String TIE_MESSAGE = "Impossible to continue. Tie";
  final static String WIN_MESSAGE = "Congratulations %s! You have won.\n";
  final static String HORIZONTAL_SEPARATOR = "|";
  final static String VERTICAL_SEPERATOR = "-";
  final static String WHITE_SPACE = " ";
  
  // variables to store states
  static int boardSize;
  static int[][] board; // -1: empty, 0: player 1, 1: player 2
  static String player1;
  static String player2;
  static int occupiedCells = 0;

  static void printBoard() {
    for (int i = 0; i < boardSize; i++) {
      for (int j = 0; j < boardSize; j++) {
        String cell = Integer.toString(i * boardSize + j + 1);
        if (board[i][j] != -1) {
          cell = PLAYER_CELLS[board[i][j]];
        }

        System.out.print(WHITE_SPACE + cell + WHITE_SPACE);
        if (j != boardSize - 1) {
          System.out.print(HORIZONTAL_SEPARATOR);
        }
      }
      System.out.println();
      
      // print seperation
      if (i != boardSize - 1) {
        for (int j = 0; j < boardSize * 3 + boardSize - 1; j++) {
          System.out.print(VERTICAL_SEPERATOR);
        }

        System.out.println();
      }
    }

    System.out.println();
  }

  static void initBoard() {
    board = new int[boardSize][boardSize];
    for (int i = 0; i < boardSize; i++) {
      for (int j = 0; j < boardSize; j++) {
        board[i][j] = -1;
      }
    }
  }

  static void readInput(Scanner sc) {
    // read size;
    while (true) {
      System.out.print(ASK_SIZE_MESSAGE);
      boardSize = sc.nextInt();
      if (boardSize >= 3) {
        initBoard();
        break;
      }
    }

    // read player name
    System.out.printf(ASK_NAME_MESSAGE, 1);
    player1 = sc.next();

    System.out.printf(ASK_NAME_MESSAGE, 2);
    player2 = sc.next();
    System.out.println();
  }

  static boolean processPlayer(Scanner sc, String playerName, int player) {
    String[] cellStrings = {"'x'", "'o'"};
    int playerIndex;
    
    System.out.printf(ASK_MOVE_MESSAGE, playerName, cellStrings[player]);
    playerIndex = sc.nextInt();

    // check if the index entered is valid
    while (!turn(playerIndex, player)) {
      printBoard();
      System.out.printf(ASK_VALID_MOVE_MESSAGE, playerName, cellStrings[player]);
      playerIndex = sc.nextInt();
    }

    printBoard();
    if (occupiedCells == boardSize * boardSize) {
      System.out.println(TIE_MESSAGE);
      return true;
    }

    // check if player 1 win
    if (checkWin(playerIndex, player)) {
      System.out.printf(WIN_MESSAGE, playerName);
      return true;
    }

    return false;
  }

  static boolean checkWin(int index, int player) {
    int row = (index - 1) / boardSize;
    int col = (index - 1) % boardSize;

    return checkHorizontalAndVertical(row, col, player, 0) || checkHorizontalAndVertical(row, col, player, 1)
      || checkMainDiagonal(row, col, player) || checkAntiDiagonal(row, col, player);
  }

  // mode 0 is horizontal, mode 1 is vertical
  static boolean checkHorizontalAndVertical(int row, int col, int player, int mode) {
    int[] delta = {-2, -1, 0, 1, 2};
    int newRow = row;
    int newCol = col;

    for (int i = 0; i < delta.length - 2; i++) {
      boolean win = true;

      // check if 3 consecutive 
      for (int j = 0; j < 3; j++) {
        if (mode == 0) {
          newCol = col + delta[i + j];
        } else if (mode == 1) {
          newRow = row + delta[i + j];
        }

        if (!isValidIndex(newRow) || !isValidIndex(newCol) || board[newRow][newCol] != player) {
          win = false;
        }
      }

      if (win) {
        return true;
      }
    }

    return false;      
  }

  static boolean checkMainDiagonal(int row, int col, int player) {
    int[] delta = {-2, -1, 0, 1, 2};
    for (int i = 0; i < delta.length - 2; i++) {
      boolean win = true;
      for (int j = 0; j < 3; j++) {
        int newRow = row + delta[i + j];
        int newCol = col + delta[i + j];
        if (!isValidIndex(newRow) || !isValidIndex(newCol) || board[newRow][newCol] != player) {
          win = false;
        }
      }

      if (win) {
        return true;
      }
    }

    return false;
  }

  static boolean checkAntiDiagonal(int row, int col, int player) {
    int[] deltaRow = {2, 1, 0, -1, -2};
    int[] deltaCol = {-2, -1, 0, 1, 2};
    for (int i = 0; i < deltaRow.length - 2; i++) {
      boolean win = true;
      for (int j = 0; j < 3; j++) {
        int newRow = row + deltaRow[i + j];
        int newCol = col + deltaCol[i + j];
        if (!isValidIndex(newRow) || !isValidIndex(newCol) || board[newRow][newCol] != player) {
          win = false;
        }
      }

      if (win) {
        return true;
      }
    }

    return false; 
  }

  static boolean turn(int index, int player) {
    int row = (index - 1) / boardSize;
    int col = (index - 1) % boardSize;
    
    if (!isValidIndex(row) || !isValidIndex(col) || board[row][col] != -1) {
      return false;
    }

    board[row][col] = player;
    occupiedCells++;
    return true;
  }

  static boolean isValidIndex(int index) {
    return index >= 0 && index < boardSize;
  }

  static void run() {
    Scanner sc = new Scanner(System.in);
    readInput(sc);
    printBoard();

    while (true) {
      // process player 1
      if (processPlayer(sc, player1, 0)) {
        break;
      }

      // process player 2
      if (processPlayer(sc, player2, 1)) {
        break;
      }
    }
  }

  public static void main(String[] args) {
    run();
  }
}

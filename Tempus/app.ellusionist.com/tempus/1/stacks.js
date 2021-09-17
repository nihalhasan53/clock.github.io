// JavaScript Document
//Value, Suit = Position
var mnemonicaLookup = {
    4: {
        Clubs: 1,
        Hearts: 5,
        Spades: 40,
        Diamonds: 42
    },
    2: {
        Hearts: 2,
        Spades: 10,
        Diamonds: 19,
        Clubs: 27
    },
    7: {
        Diamonds: 3,
        Spades: 37,
        Hearts: 41,
        Clubs: 47
    },
    3: {
        Clubs: 4,
        Diamonds: 12,
        Spades: 21,
        Hearts: 28
    },
    6: {
        Diamonds: 6,
        Spades: 15,
        Hearts: 23,
        Clubs: 50
    },
    A: {
        Spades: 7,
        Diamonds: 39,
        Clubs: 43,
        Hearts: 51
    },
    5: {
        Hearts: 8,
        Spades: 16,
        Diamonds: 25,
        Clubs: 30
    },
    9: {
        Spades: 9,
        Hearts: 17,
        Clubs: 44,
        Diamonds: 52
    },
    Q: {
        Hearts: 11,
        Clubs: 13,
        Diamonds: 46,
        Spades: 48
    },
    8: {
        Hearts: 14,
        Spades: 22,
        Diamonds: 29,
        Clubs: 33
    },
    K: {
        Clubs: 18,
        Diamonds: 26,
        Spades: 31,
        Hearts: 35
    },
    J: {
        Hearts: 20,
        Diamonds: 32,
        Clubs: 36,
        Spades: 45
    },
    10: {
        Clubs: 24,
        Spades: 34,
        Hearts: 38,
        Diamonds: 49
    },
};
var aronsonLookup = {
    A: {
        Clubs: 10,
        Hearts: 22,
        Spades: 6,
        Diamonds: 18
    },
    2: {
        Clubs: 51,
        Hearts: 4,
        Spades: 41,
        Diamonds: 13
    },
    3: {
        Clubs: 40,
        Hearts: 7,
        Spades: 17,
        Diamonds: 24
    },
    4: {
        Clubs: 45,
        Hearts: 29,
        Spades: 37,
        Diamonds: 31
    },
    5: {
        Clubs: 3,
        Hearts: 12,
        Spades: 20,
        Diamonds: 27
    },
    6: {
        Clubs: 8,
        Hearts: 39,
        Spades: 44,
        Diamonds: 49
    },
    7: {
        Clubs: 28,
        Hearts: 25,
        Spades: 19,
        Diamonds: 15
    },
    8: {
        Clubs: 16,
        Hearts: 46,
        Spades: 23,
        Diamonds: 9
    },
    9: {
        Clubs: 47,
        Hearts: 42,
        Spades: 5,
        Diamonds: 52
    },
    10: {
        Clubs: 35,
        Hearts: 38,
        Spades: 11,
        Diamonds: 32
    },
    J: {
        Clubs: 33,
        Hearts: 34,
        Spades: 1,
        Diamonds: 36
    },
    Q: {
        Clubs: 50,
        Hearts: 26,
        Spades: 48,
        Diamonds: 21
    },
    K: {
        Clubs: 2,
        Hearts: 30,
        Spades: 43,
        Diamonds: 14
    }
};
var ndoLookup = {
    A: {
        Clubs: 14,
        Hearts: 1,
        Spades: 52,
        Diamonds: 39
    },
    2: {
        Clubs: 15,
        Hearts: 2,
        Spades: 51,
        Diamonds: 38
    },
    3: {
        Clubs: 16,
        Hearts: 3,
        Spades: 50,
        Diamonds: 37
    },
    4: {
        Clubs: 17,
        Hearts: 4,
        Spades: 49,
        Diamonds: 36
    },
    5: {
        Clubs: 18,
        Hearts: 5,
        Spades: 48,
        Diamonds: 35
    },
    6: {
        Clubs: 19,
        Hearts: 6,
        Spades: 47,
        Diamonds: 34
    },
    7: {
        Clubs: 20,
        Hearts: 7,
        Spades: 46,
        Diamonds: 33
    },
    8: {
        Clubs: 21,
        Hearts: 8,
        Spades: 45,
        Diamonds: 32
    },
    9: {
        Clubs: 22,
        Hearts: 9,
        Spades: 44,
        Diamonds: 31
    },
    10: {
        Clubs: 23,
        Hearts: 10,
        Spades: 43,
        Diamonds: 30
    },
    J: {
        Clubs: 24,
        Hearts: 11,
        Spades: 42,
        Diamonds: 29
    },
    Q: {
        Clubs: 25,
        Hearts: 12,
        Spades: 41,
        Diamonds: 28
    },
    K: {
        Clubs: 26,
        Hearts: 13,
        Spades: 40,
        Diamonds: 27
    }
};
var stebbinsLookup = {
    A: {
        Clubs: 8,
        Hearts: 21,
        Spades: 34,
        Diamonds: 47
    },
    2: {
        Clubs: 4,
        Hearts: 17,
        Spades: 30,
        Diamonds: 43
    },
    3: {
        Clubs: 52,
        Hearts: 13,
        Spades: 26,
        Diamonds: 39
    },
    4: {
        Clubs: 48,
        Hearts: 9,
        Spades: 22,
        Diamonds: 35
    },
    5: {
        Clubs: 44,
        Hearts: 5,
        Spades: 18,
        Diamonds: 31
    },
    6: {
        Clubs: 40,
        Hearts: 1,
        Spades: 14,
        Diamonds: 27
    },
    7: {
        Clubs: 36,
        Hearts: 49,
        Spades: 10,
        Diamonds: 23
    },
    8: {
        Clubs: 32,
        Hearts: 45,
        Spades: 6,
        Diamonds: 19
    },
    9: {
        Clubs: 28,
        Hearts: 41,
        Spades: 2,
        Diamonds: 15
    },
    10: {
        Clubs: 24,
        Hearts: 37,
        Spades: 50,
        Diamonds: 11
    },
    J: {
        Clubs: 20,
        Hearts: 33,
        Spades: 46,
        Diamonds: 7
    },
    Q: {
        Clubs: 16,
        Hearts: 29,
        Spades: 42,
        Diamonds: 3
    },
    K: {
        Clubs: 12,
        Hearts: 25,
        Spades: 38,
        Diamonds: 51
    },
};
var eightkingsLookup = {
    8: {
        Clubs: 1,
        Hearts: 14,
        Spades: 27,
        Diamonds: 40
    },
    K: {
        Clubs: 41,
        Hearts: 2,
        Spades: 15,
        Diamonds: 28
    },
    3: {
        Clubs: 29,
        Hearts: 42,
        Spades: 3,
        Diamonds: 16
    },
    10: {
        Clubs: 17,
        Hearts: 30,
        Spades: 43,
        Diamonds: 4
    },
    2: {
        Clubs: 5,
        Hearts: 18,
        Spades: 31,
        Diamonds: 44
    },
    7: {
        Clubs: 45,
        Hearts: 6,
        Spades: 19,
        Diamonds: 32
    },
    9: {
        Clubs: 33,
        Hearts: 46,
        Spades: 7,
        Diamonds: 20
    },
    5: {
        Clubs: 21,
        Hearts: 34,
        Spades: 47,
        Diamonds: 8
    },
    Q: {
        Clubs: 9,
        Hearts: 22,
        Spades: 35,
        Diamonds: 48
    },
    4: {
        Clubs: 49,
        Hearts: 10,
        Spades: 23,
        Diamonds: 36
    },
    A: {
        Clubs: 37,
        Hearts: 50,
        Spades: 11,
        Diamonds: 24
    },
    6: {
        Clubs: 25,
        Hearts: 38,
        Spades: 51,
        Diamonds: 12
    },
    J: {
        Clubs: 13,
        Hearts: 26,
        Spades: 39,
        Diamonds: 52
    }
};
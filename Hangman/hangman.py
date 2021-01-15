#!/usr/bin/env python3

import logging
import os
import pathlib
import random
import requests
import sys

from gallow import GALLOWS

LOGFILE = pathlib.Path(f'{os.getcwd()}/logs.log')

URL = 'https://random-word-api.herokuapp.com/word?number=1'

logging.basicConfig(filename=LOGFILE,
                        format='%(asctime)s: %(levelname)s: %(message)s',
                        level=logging.DEBUG,
                        datefmt='[%Y-%m-%d %H:%M:%S]')

class Hangman:
    def __init__(self, word: str, maxTries: int = 5):
        self._secretWord = word.lower()
        self._failures = 0
        self._maxTries = maxTries
        self._guessedLetters = []
        self._leftLetters = len(word)
        
    def _getLetterFromUser(self) -> str:
        userInput = ''
        while not userInput.isalpha or len(userInput) != 1 or userInput in self._guessedLetters:
            userInput = input("Please type a letter: ").lower()
            if userInput in self._guessedLetters:
                print('You already guessed this letter!')
        return userInput

    def _checkLetterPresence(self, letter):
        if letter in self._secretWord:
            self._guessedLetters.append(letter)
            self._leftLetters -= self._secretWord.count(letter)
        else:
            print(GALLOWS[self._failures])
            self._failures += 1

    def _printSecretWord(self):
        for c in self._secretWord:
            print(c, end=' ') if c in self._guessedLetters else print('_', end=' ')
        print()

    def _finalStep(self):
        if self._failures == self._maxTries:
            print(f'You lost! The secret word was {self._secretWord}!')
        else:
            print("You guessed the word! Congratulations!")

    def _run(self):
        while self._failures < self._maxTries and self._leftLetters > 0:
            letter = self._getLetterFromUser()
            self._checkLetterPresence(letter)
            self._printSecretWord()
        self._finalStep()

    def run(self):
        try:
            self._run()
        except Exception as err:
            logging.error(err)
            sys.exit(1)

def main():
    logging.info("Hangman started")
    print("Welcome to the Hangman challenge!")
    hangman = Hangman('Toto')
    hangman.run()
    logging.info("Hangman ended")

main()

        
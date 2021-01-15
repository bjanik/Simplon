#!/usr/bin/env python3

import logging
import os
import pathlib
import random
import requests
import sys

from gallow import GALLOWS

LOGFILE = pathlib.Path(f'{os.getcwd()}/logs.log')

PID = os.getpid()

URL = 'https://random-word-api.herokuapp.com/word?number=1'

logging.basicConfig(filename=LOGFILE,
                        format='%(asctime)s: %(levelname)s: %(message)s',
                        level=logging.DEBUG,
                        datefmt='[%Y-%m-%d %H:%M:%S]')

class Hangman:
    def __init__(self, maxTries: int = 5):
        self._secretWord = ''
        self._failures = 0
        self._maxTries = maxTries
        self._guessedLetters = []
        
    def _getRandomWord(self):
        req = requests.get(URL)
        if req.status_code == 200:
            self._secretWord = req.text[2:-2]
            self._leftLetters = len(self._secretWord)
            logging.info(f'{PID}: Successfully retrieved random word')
        else:
            logging.error(f'{PID}: Failed to retrieve random word')
            sys.exit(1)


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
        self._getRandomWord()
        self._printSecretWord()
        while self._failures < self._maxTries and self._leftLetters > 0:
            letter = self._getLetterFromUser()
            self._checkLetterPresence(letter)
            self._printSecretWord()
        self._finalStep()

    def run(self):
        try:
            self._run()
        except (Exception, BaseException) as err:
            logging.error(f'{PID}: {err}. Exiting hangman...')
            sys.exit(1)

def main():
    logging.info(f'{PID}: Hangman started')
    print("Welcome to the Hangman challenge!")
    hangman = Hangman()
    hangman.run()
    logging.info(f'{PID}: Hangman ended')

main()
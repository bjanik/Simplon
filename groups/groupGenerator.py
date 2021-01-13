
import json
import logging
import os
import pathlib
import random
import sys

class GroupGenerator:
    ''' Class for handling random groups distribution.
    Takes as input a file with students' names and
    an integer indicating number of students per group'''
    
    def __init__(self, input: pathlib.Path, size: int, output: pathlib.Path, pid: int):
        self._pid = pid  # PID will be used for logs
        self._input = pathlib.Path(f'{os.getcwd()}/{input}')
        self._output = pathlib.Path(f'{os.getcwd()}/{output}')
        self._studentsByGroup = size
        self._studentsList = [] # Will store list of names after reading studentsFile
        self._groupDistribution = {}

    def _getStudentsList(self):
        with open(self._input, 'r') as f:
            for line in f:
                self._studentsList.append(line.strip(" \n"))
        logging.info(f'{self._pid}: Successfully retrieved students names from {self._input}')

    def _createGroups(self):
        groupNumber = 1
        while self._studentsList:
            self._groupDistribution[groupNumber] = []
            for _ in range(self._studentsByGroup):
                if not self._studentsList:
                    break
                choice = random.choice(self._studentsList)
                self._groupDistribution[groupNumber].append(choice)
                self._studentsList.remove(choice)
            groupNumber += 1

    def _saveDistributionGroup(self):
        with open(self._output, 'w') as f:
            json.dump(self._groupDistribution, f, indent=4)
        logging.info(f'{self._pid}: Storing randomly created groups in {self._output} succeded')


    def run(self):
        try:
            self._run()
        except Exception as err:
            logging.error(f'{self._pid}: {err}. Exiting script...')
            sys.exit(1)

    def _run(self):
        self._getStudentsList()
        self._createGroups()
        self._saveDistributionGroup()


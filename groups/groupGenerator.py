
import json
import logging
import os
import pathlib
import random

class GroupGenerator:
    ''' Class for handling random groups distribution.
    Takes as input a file with students' names and
    an integer indicating number of students per group'''
    
    def __init__(self, studentsFile: pathlib.Path, n: int, groupsFile: pathlib.Path):
        self._pid = os.getpid() # PID will be used for logs
        self._studentsFile = pathlib.Path(f'{os.getcwd()}/{studentsFile}')
        self._studentsByGroup = n
        self._groupsFile = pathlib.Path(f'{os.getcwd()}/{groupsFile}')
        self._studentsList = [] # Will store list of names after reading studentsFile
        self._groupDistribution = {}

    def _getStudentsList(self):
        with open(self._studentsFile, 'r') as f:
            for line in f:
                self._studentsList.append(line.strip(" \n"))

    def _createGroups(self):
        groupNumber = 1
        while self._studentsList:
            currentGroup = []
            for _ in range(self._studentsByGroup):
                if not self._studentsList:
                    break
                choice = random.choice(self._studentsList)
                currentGroup.append(choice)
                self._studentsList.remove(choice)
            self._groupDistribution[groupNumber] = currentGroup
            groupNumber += 1

    def _saveDistributionGroup(self):
        with open(self._groupsFile, 'w') as f:
            json.dump(self._groupDistribution, f, indent=4)


    def run(self):
        try:
            self._run()
        except FileNotFoundError as err:
            logging.error(f'{self._pid}: {err}')

    def _run(self):
        self._getStudentsList()
        self._createGroups()
        self._saveDistributionGroup()


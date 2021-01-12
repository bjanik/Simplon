#!/usr/bin/env python3

import argparse
import json
import logging
import os
import pathlib
import random
import sys

GROUPFILE = pathlib.Path(f'{os.getcwd()}/groupDistrib.json')
LOGFILE = pathlib.Path(f'{os.getcwd()}/logs.log')
PID = os.getpid()

logging.basicConfig(filename=LOGFILE, format='%(asctime)s: %(levelname)s: %(message)s', level=logging.DEBUG)

def getNamesFromFile(filename) -> list:
    names = []
    with open(filename, 'r') as f:
        for line in f:
            names.append(line.strip(" \n"))
    return names

def createGroups(names, nbByGroup) -> dict:
    groupDistrib = {}
    groupNumber = 1
    while names:
        currentGroup = []
        for _ in range(nbByGroup):
            if not names:
                break
            choice = random.choice(names)
            currentGroup.append(choice)
            names.remove(choice)
        groupDistrib[groupNumber] = currentGroup
        groupNumber += 1
    return groupDistrib

def save

def main():
    logging.info(f'{PID}: Script started')
    studentFilename = sys.argv[1]
    try:
        studentsNames = getNamesFromFile(studentFilename)
    except (FileNotFoundError, PermissionError) as err:
        logging.error(f'{PID}: File {os.path.abspath(studentFilename)}: {err}')
        sys.exit(1)


    studentsByGroup = int(sys.argv[2])
    groups = createGroups(studentsNames, studentsByGroup)
    with open(GROUPFILE, 'w') as f:
        json.dump(groups, f, indent=4)
        logging.info(f'{PID}: Saved groups distribution in {GROUPFILE}')

    logging.info(f'{PID}: Script successfully ended')

if __name__ == '__main__':
    main()



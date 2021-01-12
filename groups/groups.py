#!/usr/bin/env python3

import argparse
import json
import logging
import os
import pathlib
import random
import sys

from groupGenerator import GroupGenerator

# GROUPFILE = pathlib.Path(f'{os.getcwd()}/groupDistrib.json')
PID = os.getpid()
LOGFILE = pathlib.Path(f'{os.getcwd()}/logs.log')

try:
    logging.basicConfig(filename=LOGFILE,
                        format='%(asctime)s: %(levelname)s: %(message)s',
                        level=logging.DEBUG,
                        datefmt='[%Y-%m-%d %H:%M:%S]')
except PermissionError as err:
    print(f'Failed to init logger : {err}', file=sys.stderr)

# def getNamesFromFile(filename) -> list:
#     names = []
#     with open(filename, 'r') as f:
#         for line in f:
#             names.append(line.strip(" \n"))
#     return names

# def createGroups(names, nbByGroup) -> dict:
#     groupDistrib = {}
#     groupNumber = 1
#     while names:
#         currentGroup = []
#         for _ in range(nbByGroup):
#             if not names:
#                 break
#             choice = random.choice(names)
#             currentGroup.append(choice)
#             names.remove(choice)
#         groupDistrib[groupNumber] = currentGroup
#         groupNumber += 1
#     return groupDistrib

# def saveDistributionGroup(groups: dict):
#     with open(GROUPFILE, 'w') as f:
#         json.dump(groups, f, indent=4)
#         logging.info(f'{PID}: Saved groups distribution in {GROUPFILE}')

def getArgs():
    parser = argparse.ArgumentParser('Group generator')
    parser.add_argument('--students-file',
                        type=pathlib.Path,
                        action='store',
                        required=True,
                        help='Name of the file where are stored students\' names')
    parser.add_argument('--group-size',
                        type=int,
                        action='store',
                        required=True,
                        help='Maximum number of students per group')
    parser.add_argument('--groups-file',
                        type=pathlib.Path,
                        action='store',
                        required=True,
                        help='Name of the file where randomly generated groups are stored')
    return parser.parse_args()


def main():
    logging.info(f'{PID}: Script started')

    args = getArgs()

    groupGenerator = GroupGenerator(args.students_file, args.group_size, args.groups_file)
    groupGenerator.run()
    logging.info(f'{PID}: Script ended successfully')


if __name__ == '__main__':
    main()



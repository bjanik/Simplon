#!/usr/bin/env python3

import argparse
import logging
import os
import pathlib
import sys

from groupGenerator import GroupGenerator

LOGFILE = pathlib.Path(f'{os.getcwd()}/logs.log')

try:
    logging.basicConfig(filename=LOGFILE,
                        format='%(asctime)s: %(levelname)s: %(message)s',
                        level=logging.DEBUG,
                        datefmt='[%Y-%m-%d %H:%M:%S]')
except Exception as err:
    print(f'Failed to init logger : {err}', file=sys.stderr)

def getArgs():
    logging.info(f'{os.getpid()}: Start parsing arguments')
    parser = argparse.ArgumentParser('Group generator')
    parser.add_argument('-i', '--input',
                        type=pathlib.Path,
                        action='store',
                        required=True,
                        help='Name of the file where are stored students\' names')
    parser.add_argument('-s', '--size',
                        type=int,
                        action='store',
                        required=True,
                        help='Maximum number of students per group')
    parser.add_argument('-o', '--output',
                        type=pathlib.Path,
                        action='store',
                        required=True,
                        help='Name of the file where randomly generated groups are written')
    logging.info(f'{os.getpid()}: Argument parsing succeded')
    return parser.parse_args()


def main():
    pid = os.getpid()
    logging.info(f'{pid}: Script started')
    args = getArgs()
    groupGenerator = GroupGenerator(args.input, args.size, args.output, pid)
    groupGenerator.run()
    logging.info(f'{pid}: Script ended successfully')


if __name__ == '__main__':
    main()



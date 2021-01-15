from setuptools import setup

setup(
    name='hangman',
    entry_points={
        'console_scripts': [
            'hangman = hangman:main'
        ]
    }
)
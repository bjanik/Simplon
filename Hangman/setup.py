from setuptools import setup, find_packages

setup(
    name="hangman",
    version="1.0.0",
    install_requires=[
        "requests"
    ],
    package_dir={'':'src'},
    packages=find_packages('src'),
    entry_points={
        "console_scripts": [
            "hangman=hangman.hangman:main"
        ]
    },
    python_requires='>=3.6',
)

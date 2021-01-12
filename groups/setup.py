from setuptools import setup

setup(
    name='groupGenerator',
    entrypoints={
        'console-scripts': [
            'group-generator = groups:main'
        ]
    }
)
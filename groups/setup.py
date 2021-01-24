from setuptools import setup

setup(
    name='groupGenerator',
    entry_points={
        'console_scripts': [
            'groups-generator = groups:main'
        ]
    }
)

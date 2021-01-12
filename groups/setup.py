from setuptools import setup

setup(
    name='groupGenerator',
    entry_points={
        'console_scripts': [
            'group-generator = groups:main'
        ]
    }
)
Table of Contents:

- [Project Gotchas](#project-gotchas)
    - [setting up environment](#setting-up-environment)
# Project Gotchas

### setting up environment

installing pipenv:
```bash
pip install pipenv
```

To setup pipenv in local directory:
```bash
export PIPENV_VENV_IN_PROJECT="enabled"
```

installing python 3.9.x on ubuntu:
```bash
sudo apt install python3.9
```

creating pipenv virutal environment using specific python version 3.9.x:
```bash
pipenv install --python 3.9
```

activate virtual env:
```bash
pipenv shell
```
*note: at this point you should see in your termianl a .venv decorator along with the specific python version installed for the project. in this case, 3.9.5*

install django and necessary packages:
pipenv install django djangorestframework djangorestframework-simplejwt

installing psycopg2 for using postgres in django:
*note: you need to install pre-reqs system wide in order to build from source for use in production. explained here: https://stackoverflow.com/questions/5420789/how-to-install-psycopg2-with-pip-on-python*
```bash
sudo apt install libpq-dev python3-dev
pipenv install psycopg2
```

selecting python interpreter path for local virtual environment:
CTRL + SHIFT + P, Python: Select Interpreter OR click the python env in lower left hand corner of vs code
the path to enter will be the absolute path of wherever the .venv/bin/python is located.
For example, `/home/tony/REPOs/web3Social/backend/.venv/bin/python`

creating django project:

creating apps within django project:

running django project:




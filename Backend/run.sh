#!/bin/bash
. .venv/bin/activate
export FLASK_APP=app
export FLASK_ENV=development
flask run --cert=adhoc -h 0.0.0.0 --debug

#!/bin/bash
export FLASK_APP=app
export FLASK_ENV=development
flask run --cert=adhoc -h 192.168.20.162 --debug
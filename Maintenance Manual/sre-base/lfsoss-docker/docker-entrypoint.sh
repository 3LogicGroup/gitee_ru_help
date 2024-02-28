#!/bin/bash

/home/git/oscbin/bin/lfsserve -sql-migrate

exec $@

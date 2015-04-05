#!/bin/sh

# Prepares the environment to develop.
# Cleans output dir, builds the project from scratch.
# Then starts watch and webserver to enable agile development

gulp clean
gulp build
gulp watch &
gulp webserver &
wait
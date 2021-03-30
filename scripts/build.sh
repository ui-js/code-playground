#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

export BASENAME="\033[40m"CodePlayground"\033[0m" # `basename "$0"`
export DOT="\033[32m ● \033[0m"
export CHECK="\033[32m ✔ \033[0m"
export LINECLEAR="\033[1G\033[2K" # position to column 1; erase whole line
export ERROR="\033[31m ERROR \033[0m"

# Read the first argument, set it to "development" if not set
if [ "$#" -gt 1 ]; then
    echo -e "$BASENAME$ERROR Expected at most one argument: 'development' (default) or 'production'"
    exit 1
fi
export BUILD="${1-development}"



# If no "node_modules" directory, do an install first
if [ ! -d "./node_modules" ]; then
    printf "$BASENAME$DOT Installing dependencies"
    npm install
    echo -e "$LINECLEAR$BASENAME$CHECK Dependencies installed"
fi


if [ "$BUILD" = "development" ] || [ "$BUILD" = "production" ]; then
    # Clean output directories
    printf "$BASENAME$DOT Cleaning output directories"
    rm -rf ./build
    rm -rf ./dist
    echo -e "$LINECLEAR$BASENAME$CHECK Output directories cleaned"


    if [ "$BUILD" != "production" ]; then
        mkdir -p build
        export BUILD_DIR="build"
    else
        mkdir -p dist
        export BUILD_DIR="dist"
    fi

    # Do build
    echo -e "$BASENAME$DOT Making a \033[33m$BUILD\033[0m build"
    npx rollup --config 
    echo -e "$LINECLEAR$BASENAME$CHECK Completed \033[33m" $BUILD "\033[0m build"

else
    echo -e "$BASENAME$ERROR Expected: 'development' (default) or 'production'"
    exit 1
fi

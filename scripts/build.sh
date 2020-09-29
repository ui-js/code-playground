#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."



# Read the first argument, set it to "development" if not set
if [ "$#" -gt 1 ]; then
    echo -e "\033[40m`basename "$0"`\033[0m\033[31m ERROR \033[0m Expected at most one argument: 'development' (default) or 'production'"
    exit 1
fi
export BUILD="${1-development}"



# If no "node_modules" directory, do an install first
if [ ! -d "./node_modules" ]; then
    echo -e "\033[40m`basename "$0"`\033[0m 🚀 Installing dependencies"
    npm install
fi


if [ "$BUILD" = "development" ] || [ "$BUILD" = "production" ]; then
    # Clean output directories
    echo -e "\033[40m`basename "$0"`\033[0m 🚀 Cleaning output directories"
    rm -rf ./build
    rm -rf ./dist


    if [ "$BUILD" != "production" ]; then
        mkdir -p build
        export BUILD_DIR="build"
    else
        mkdir -p dist
        export BUILD_DIR="dist"
    fi

    # Do build
    echo -e "\033[40m`basename "$0"`\033[0m 🚀 Making a \033[33m" $BUILD "\033[0m build"
    npx rollup --config 

else
    echo -e "\033[40m`basename "$0"`\033[0m\033[31m ERROR \033[0m Expected: 'development' (default) or 'production'"
    exit 1
fi

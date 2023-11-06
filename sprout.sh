#!/bin/bash

if [ -z "$1" ]; then
    echo "Please provide a directory name as an argument."
    exit 1
fi

directory_name="$1"

mkdir "$directory_name"
if [ $? -eq 0 ]; then
    echo "Directory '$directory_name' created successfully."
    cd "$directory_name" || exit 1
    echo "Changed directory to '$(pwd)'."
else
    echo "Failed to create directory."
    exit 1
fi

#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
	exit 0
fi

while [ $# -gt 0 ]; do
	echo "$1"
	shift
done

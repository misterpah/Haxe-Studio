#!/bin/bash
cd "`dirname "$0"`"

if [ "$(uname -m)" == "x86_64" ]
then
	echo "detecting linux-64 bit"
	LD_LIBRARY_PATH="./runtime/linux-64/library:${LD_LIBRARY_PATH}" ./runtime/linux-64/nw ./bin $@
else
	echo "detecting linux-32 bit"
	LD_LIBRARY_PATH="./runtime/linux-32/library:${LD_LIBRARY_PATH}" ./runtime/linux-32/nw ./bin $@
fi

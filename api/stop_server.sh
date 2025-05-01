#!/bin/bash

# Kill any running Python server processes
pkill -f "python3 server.py"
pkill -f "python3 simple_server.py"

echo "All server processes have been stopped." 
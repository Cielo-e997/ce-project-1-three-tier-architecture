#!/usr/bin/env bash
set -e

sudo dnf update -y
sudo dnf install -y nodejs

mkdir -p ~/app
cp server.js ~/app/server.js

# Run app on port 80 (requires sudo)
sudo node ~/app/server.js &
echo "App deployed and started in background."

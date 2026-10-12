#!/bin/sh
set -eu

echo "Ensuring Ruby dependencies and Gemfile.lock are current..."
bundle install

exec "$@"
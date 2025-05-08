#!/bin/sh

set -eux

tsc
node dist/raw.js

#!/bin/sh

set -eux

mkdir -p models
npx --no node-llama-cpp pull --dir ./models hf:unsloth/Llama-3.2-3B-Instruct-GGUF:Q4_K_M

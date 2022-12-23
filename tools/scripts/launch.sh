#!/bin/bash

#-e USER="$(id -u)" \
#-u="$(id -u)" \

docker run \
  -v /workspace/elide/runtime:/src/workspace \
  -v $(pwd)/build:/tmp/build_output \
  -w /src/workspace \
  -it us-docker.pkg.dev/elide-fw/tools/builder:latest bash;


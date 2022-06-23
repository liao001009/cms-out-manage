#!/bin/sh

# stop shell execution on the first error
set -e

echo "build image"
docker image build -t cms-out-manage .

echo "save image file"
docker save -o cms-out-manage.tar cms-out-manage:latest
docker image rm cms-out-manage:latest
echo "done!"
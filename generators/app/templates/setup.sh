#!/bin/bash
docker run -v $(pwd):/project node /bin/bash -c "cd /project && npm install"

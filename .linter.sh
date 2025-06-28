#!/bin/bash
cd /home/kavia/workspace/code-generation/openstaffhub-35373-1f93724e/ems_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


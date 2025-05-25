#!/bin/bash
echo "Creating bucket: ${BUCKET_NAME}"
awslocal s3 mb s3://${BUCKET_NAME}
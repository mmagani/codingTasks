- Building a React Project
In my case 
musa@musa-VirtualBox:~/task18/react-interest-calculator$ npm run build


- Navigate to the required folder/create folder
musa@musa-VirtualBox:~/task27$ mkdir my-site
musa@musa-VirtualBox:~/task27$ cd my-site/


- Copy dist folder to require folder
musa@musa-VirtualBox:~/task27/my-site$ cp -r /home/musa/task18/react-interest-calculator/dist/ .


- Create policy.json with 
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": ["s3:GetObject"],
        "Resource": ["arn:aws:s3:::my-site/*"]
      }
   ]
}

musa@musa-VirtualBox:~/task27/my-site$ nano policy.json


- Create compose file 
version: “3.8”

services:
 localstack:
    container_name: stacky
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"
      - "127.0.0.1:4510-4559:4510-4559"
    volumes:
      - ./my-site:/opt/code/localstack/my-site

musa@musa-VirtualBox:~/task27/my-site$ nano  docker-compose.yml


- Run docker compose to pull and build image
musa@musa-VirtualBox:~/task27/my-site$ docker compose up -d
WARN[0000] /home/musa/task27/my-site/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion 
[+] Running 25/25
 ✔ localstack Pulled                                                                                                                                                                                147.3s 
   ✔ 0d653a9bda6a Pull complete                                                                                                                                                                      36.1s 
   ✔ 183f0922284a Pull complete                                                                                                                                                                      36.3s 
   ✔ 5dbb3b698b72 Pull complete                                                                                                                                                                      37.4s 
   ✔ 0c5ce2cb4ecc Pull complete                                                                                                                                                                      37.4s 
   ✔ bcc9aa198e72 Pull complete                                                                                                                                                                      74.5s 
   ✔ dc24c4f010c3 Pull complete                                                                                                                                                                      77.9s 
   ✔ 6c3608a235ec Pull complete                                                                                                                                                                      77.9s 
   ✔ 0f2dbfe03883 Pull complete                                                                                                                                                                      78.0s 
   ✔ 4f4fb700ef54 Pull complete                                                                                                                                                                      78.0s 
   ✔ 142e4ad79c2c Pull complete                                                                                                                                                                      78.0s 
   ✔ 17e64996fd43 Pull complete                                                                                                                                                                      78.0s 
   ✔ c71f5204834a Pull complete                                                                                                                                                                      78.1s 
   ✔ fddd99cfc74e Pull complete                                                                                                                                                                      81.4s 
   ✔ 7bf4f08d6045 Pull complete                                                                                                                                                                     141.5s 
   ✔ e0e91dea30f2 Pull complete                                                                                                                                                                     141.5s 
   ✔ aa9de8f5e5f7 Pull complete                                                                                                                                                                     141.6s 
   ✔ a94ec8001ed3 Pull complete                                                                                                                                                                     142.0s 
   ✔ 266dcbe13a14 Pull complete                                                                                                                                                                     142.0s 
   ✔ 397a027235dc Pull complete                                                                                                                                                                     143.2s 
   ✔ 69247643cc0f Pull complete                                                                                                                                                                     143.3s 
   ✔ 7ece331f81a8 Pull complete                                                                                                                                                                     145.3s 
   ✔ 0daf92fbc38e Pull complete                                                                                                                                                                     145.4s 
   ✔ 96f2259204f2 Pull complete                                                                                                                                                                     145.4s 
   ✔ 1f260c98ef7d Pull complete                                                                                                                                                                     145.4s 
[+] Running 2/2
 ✔ Network my-site_default  Created                                                                                                                                                                   0.3s 
 ✔ Container stacky         Started    
                                                                                                                                                               2.2s 
- Access docker container
musa@musa-VirtualBox:~/task27/my-site$ docker exec -it stacky bash
root@115a505b0f6e:/opt/code/localstack#

- Setting up an S3 bucket
root@115a505b0f6e:/opt/code/localstack# cd my-site
root@115a505b0f6e:/opt/code/localstack/my-site# awslocal s3api create-bucket --bucket my-site
{
    "Location": "/my-site"
}
root@115a505b0f6e:/opt/code/localstack/my-site# awslocal s3api list-buckets
{
    "Buckets": [
        {
            "Name": "my-site",
            "CreationDate": "2025-03-14T04:28:24.000Z"
        }
    ],
    "Owner": {
        "DisplayName": "webfile",
        "ID": "75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a"
    },
    "Prefix": null
}


-  Upload index.html to S3 bucket
root@115a505b0f6e:/opt/code/localstack/my-site# cd dist/
root@115a505b0f6e:/opt/code/localstack/my-site/dist# awslocal s3 website s3://my-site --index-document index.html


- Upload the remaining files
root@115a505b0f6e:/opt/code/localstack/my-site/dist# cd ..
root@115a505b0f6e:/opt/code/localstack/my-site# awslocal s3 sync dist s3://my-site
upload: dist/index.html to s3://my-site/index.html                 
upload: dist/assets/index-B4wp6fcK.js to s3://my-site/assets/index-B4wp6fcK.js
upload: dist/assets/index-CiAd-W9Q.css to s3://my-site/assets/index-CiAd-W9Q.css
upload: dist/vite.svg to s3://my-site/vite.svg                     


- Allow public access to the website
root@115a505b0f6e:/opt/code/localstack/my-site# awslocal s3api put-bucket-policy --bucket my-site --policy file://policy.json
root@115a505b0f6e:/opt/code/localstack/my-site#


- Access website. You will be able to access the website on the following link:
http://my-site.s3.localhost.localstack.cloud:4566/index.html
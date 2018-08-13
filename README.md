# bravia-mqtt-aws
Control Sony Bravia TV with MQTT over WebSocket using AWS IoT Device SDK

## Repository Structure
this repository is a using a monorepo pattern with lerna and yarn workspace.  
put a each package in the ```packages``` directory

```
bravia-mqtt-aws
| - tsconfig.json
| - tsconfig.base.json
| - README.md
| - lerna.json
| - package.json
| - packages/
|   | - core/
|   |    |-- package.json
|   |    |-- tsconfig.build.json
|   |    |-- tsconfig.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
|   | - subscribe/
|   |    |-- package.json
|   |    |-- tsconfig.build.json
|   |    |-- tsconfig.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
```

## Development
see in boilerplate/README.md

* https://github.com/teitei-tk/bravia-mqtt-aws/blob/master/boilerplate/README.md


## Setup
### setup aws-cli
```bash
$ pyenv install .python-version # requirement pyenv.
$ pip install pipenv
$ pipenv install
```

### Create your thing
```bash
$ pipenv run aws iot create-thing --thing-name YOUR_THING_NAME
```

### Register New Certificate
```bash
$ pipenv run aws iot create-keys-and-certificate --set-as-active > certificate.json
```

save certificate

```bash
$ curl -o certs/root-CA.pem https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem

$ node << EOS
const fs = require('fs');
const json = require('./certificate.json');

fs.writeFile('./certs/public-key.pem', json.keyPair.PublicKey, (err) => {
    if (err) {
        throw err;
    }

    console.log('publick-key has beed saved');
});

fs.writeFile('./certs/private-key.pem', json.keyPair.PrivateKey, (err) => {
    if (err) {
        throw err;
    }

    console.log('private-key has beed saved');
});

fs.writeFile('./certs/cert.pem', json.certificatePem, (err) => {
    if (err) {
        throw err;
    }

    console.log('private-key has beed saved');
});
EOS
```

### Create IoT Policy
```bash
cat << EOS > policy.json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action":["iot:*"],
        "Resource": ["*"]
    }]
}
EOS
$ pipenv run aws iot create-policy --policy-name "YourPolicyName" --policy-document file://policy.json
```

### bind policy to pricipal
```bash
# print principal arn
$ node -p "const json = require('./certificate.json'); json.certificateArn"
$ pipenv run aws iot attach-principal-policy --principal "principalArn" --policy-name "YourPolicyName"
```

### ping Test

install MQTT Client via brew

```bash
$ brew install mosquitto
```

check describe endpoint

```bash
$ pipenv run aws iot describe-endpoint
{
  "endpointAddress": "Your.iot.ap-northeast-1.amazonaws.com"
}


```

start subscribe

```bash
/usr/local/opt/mosquitto/bin/mosquitto_sub --cafile certs/root-CA.pem --cert certs/cert.pem --key certs/private-key.pem -h "Your.iot.ap-northeast-1.amazonaws.com" -p 8883 -q 1 -d -t topic/test -i clientid1
Client clientid1 sending CONNECT
Client clientid1 received CONNACK
Client clientid1 sending SUBSCRIBE (Mid: 1, Topic: topic/test, QoS: 1)
Client clientid1 received SUBACK
Subscribed (mid: 1): 1
```

publish message

```bash
/usr/local/opt/mosquitto/bin/mosquitto_pub --cafile certs/root-CA.pem --cert certs/cert.pem --key certs/private-key.pem -h "Your.iot.ap-northeast-1.amazonaws.com" -p 8883 -q 1 -d -t topic/test -i clientid2 -m "Hello, World"
Client clientid2 sending CONNECT
Client clientid2 received CONNACK
Client clientid2 sending PUBLISH (d0, q1, r0, m1, 'topic/test', ... (12 bytes))
Client clientid2 received PUBACK (Mid: 1)
Client clientid2 sending DISCONNECT
```

check in subcribe console

```bash
Client clientid1 received PUBLISH (d0, q1, r0, m1, 'topic/test', ... (12 bytes))
Client clientid1 sending PUBACK (Mid: 1)
Hello, World
```

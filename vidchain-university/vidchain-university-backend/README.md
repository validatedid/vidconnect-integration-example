# University backend demo

### Before running the demo

In order to run this backend application a Redis database must be served locally:
```
docker run -d -p 127.0.0.1:6379:6379 redis:alpine 
```

In order to expose the backend of this application so it can receive callback responses from VIDChain API, install [ngrok](https://ngrok.com/) in your machine and run in your terminal:

```
./ngrok http 3023
```

Then, the enpoint provided by ngrok tunneling your localhost service will be shown.

In the main directory, create an _.env_ file copying _.env.example_ and update "BASE_URL" and "WS_URL" with your tunnel enpoint. These parameter must be updated with the enpoint where **vidchain-university-backend** can be found, i.e. the tunnel, for instance:

```
BASE_URL=http://5k3ieae7ac7.ngrok.io/demo/universitybackend
WS_URL=http://5k3ieae7ac7.ngrok.io/
```

Once you have updated the parameter mentioned above, you can run the demo by either running node or building and starting a container.

### Running Node

Obtain the necessary dependencies so the artifacts can be build and run:

```
npm install
npm run build
npm run start
```

### Running Docker

Build your local image by running:

```
docker build -t vidchain/university-backend:v0.1 .
docker images
```

Run the container:

```
docker run --name myapp -it -d -p 127.0.0.1:3023:3023 vidchain/university-backend:v0.1
docker ps
```

# nats-client-action

act as a nats client to check if nats server is up

# Usage

```yaml
name: Test
on: [push]
jobs:
  test-cluster:
    runs-on: ubuntu-latest
    name: Test cluster

    steps:
      - name: Create Nats server
        run: sudo docker network create nats && sudo docker run -d -p 4222:4222 --network nats --name master nats:alpine && sudo docker run -d --name slave1 -p 4223:4222 --network nats nats:alpine --cluster nats://0.0.0.0:6222 --routes=nats://ruser:T0pS3cr3t@master:6222

      - name: connect to server
        uses: onichandame/nats-client-action@master
        with:
          servers: "nats://localhost:4222 nats://localhost:4223"
          cluster: "true"
```

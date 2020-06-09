import { setFailed, info, getInput } from "@actions/core"
import { generate } from "randomstring"
import { connect } from "ts-nats"

const randomOptions: Parameters<typeof generate>[0] = {
  length: 20,
  charset: "alphanumeric"
}

const parseServers = (): string[] =>
  getInput("servers")
    .split(" ")
    .filter(v => !!v)

const servers = parseServers()

const testServer = async (server: string) => {
  info(`testing server ${server}`)
  return connect(server).then(nc => nc.close())
}

const testCluster = async (server: string) => {
  info(`testing server ${server} in cluster ${JSON.stringify(servers)}`)
  const subject = generate(randomOptions)
  const sub = await connect(server)
  let count = 0
  return new Promise((r, j) => {
    setTimeout(
      () => j(new Error(`timeout at ${server}, ${count}/${servers.length}`)),
      5000
    )
    sub.subscribe(subject, e => {
      if (e) j(`failed to receive ${count + 1}/${servers.length} at ${server}`)
      if (++count == servers.length) {
        info(`subscription on ${server} received messages from all servers`)
        sub.close()
        r()
      }
    })
    servers.forEach(async s => {
      const pub = await connect(s)
      pub.publish(subject)
      await pub.flush()
      info(`testing ${server}, message from ${s} published`)
      pub.close()
    })
  }).catch(e => {
    sub.close()
    throw e
  })
}

async function run() {
  try {
    let p: Promise<any>[] = []
    for (let server of servers) p.push(testServer(server))
    if (getInput("cluster") === "true") {
      for (let server of servers) p.push(testCluster(server))
    }
    await Promise.all(p)
  } catch (e) {
    setFailed(JSON.stringify(e.message || e))
  }
}

run()

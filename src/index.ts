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
    setTimeout(() => j(new Error("timeout")), 5000)
    sub.subscribe(subject, e => {
      if (e) j(e)
      if (++count == servers.length) {
        sub.close()
        r()
      }
    })
    servers.forEach(async s => {
      const pub = await connect(s)
      pub.publish(subject)
      await pub.flush()
      pub.close()
    })
  })
}

async function run() {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con)
    info("connection to all servers tested")
    if (getInput("cluster") === "true") {
      info("testing cluster")
      await Promise.all(servers.map(s => testCluster(s)))
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
}

run()

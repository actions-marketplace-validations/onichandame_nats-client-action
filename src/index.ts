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

async function run() {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con)
    info("connection to all servers tested")
    if (getInput("cluster") === "true") {
      info("testing cluster")
      for (let server of servers) {
        info(`testing subscription on ${server}`)
        const subject = generate(randomOptions)
        const nc = await connect({ servers: servers })
        const total = servers.length
        await new Promise(async (r, j) => {
          let count = 0
          nc.subscribe(subject, () => {
            info(`testing ${server}, received ${count + 1}/${total}`)
            if (++count == total) {
              nc.close()
              r()
            }
          })
          setTimeout(() => j("timeout"), 5000)
          for (let ins of servers) {
            const i = await connect(ins)
            i.publish(subject)
            await i.flush()
            i.close()
          }
        })
      }
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
}

run()

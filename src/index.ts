import { setFailed, info, getInput } from "@actions/core"
import { connect } from "ts-nats"

const parseServers = (): string[] =>
  getInput("servers")
    .split(" ")
    .filter(v => !!v)

const servers = parseServers()

const testServer = async (server: string) => {
  info(`testing server ${server}`)
  connect(server).then(nc => nc.close())
}
;(async () => {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con)
    if (getInput("cluster") === "true") {
      info("testing cluster")
      let p: Promise<any>[] = []
      p = p.concat(
        servers.map(
          server =>
            new Promise((_, j) => {
              info(`testing subscription on ${server}`)
              setTimeout(() => j(new Error(`subscription timeout`)), 5000)
            })
        )
      )
      await Promise.all(p)
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
})()

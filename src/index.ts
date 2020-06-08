import { setFailed, info, getInput } from "@actions/core"
import { connect } from "ts-nats"

const parseServers = (): string[] =>
  getInput("servers")
    .split(" ")
    .filter(v => !!v)

const servers = parseServers()

const testServer = async (server: string) => {
  info(`testing server ${server}`)
  return connect(server).then(nc => nc.close())
}
;(async () => {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con)
    if (getInput("cluster") === "true") {
      info("testing cluster")
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
})()

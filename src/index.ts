import { setFailed, info, getInput } from "@actions/core"
import { connect } from "ts-nats"

const parseServers = (): string[] =>
  getInput("servers")
    .split(" ")
    .filter(v => !!v)

const servers = parseServers()

const testServer = async (server: string) =>
  connect(server)
    .then(nc => nc.close())
    .catch(e => {
      info(`testing server ${server}`)
      setFailed(`server ${server} failed due to ${JSON.stringify(e)}`)
    })
;(async () => {
  const con: Promise<any>[] = []
  for (let server of servers) con.push(testServer(server))
  await Promise.all(con)
})()

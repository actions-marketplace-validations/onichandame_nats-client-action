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
;(async () => {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con)
    if (getInput("cluster") === "true") {
      info("testing cluster")
      for (let server of servers) {
        info(`testing subscription on ${server}`)
        const subject = generate(randomOptions)
        const total = servers.length
        let count = 0
        const nc = await connect(server)
        nc.subscribe(subject, () => ++count)
        for (let ins of servers) {
          const i = await connect(ins)
          i.publish(subject)
          await i.flush()
        }
        if (count < total)
          throw new Error(
            `${server} expects ${total} messages but only got ${count}`
          )
      }
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
})()

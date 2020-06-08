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
  connect(server)
    .then(nc => nc.close())
    .catch(e => {
      setFailed(`server ${server} failed due to ${JSON.stringify(e)}`)
    })
}
;(async () => {
  try {
    let con: Promise<any>[] = []
    for (let server of servers) con.push(testServer(server))
    await Promise.all(con).catch(e => setFailed(JSON.stringify(e.message || e)))
    if (getInput("cluster") === "true") {
      info("testing cluster")
      const p: Promise<any>[] = []
      for (let server of servers) {
        const subject = generate(randomOptions)
        const nc = await connect(server)
        p.push(
          new Promise((r, j) => {
            let count = 0
            nc.subscribe(subject, () => {
              info(
                `testing subscription on ${server} ${count + 1}/${
                  servers.length
                }`
              )
              if (++count === servers.length) r()
            })
            setTimeout(() => j(new Error(`subscription timeout`)), 1000)
          })
        )
        for (let target of servers)
          connect(target).then(nc => {
            nc.publish(subject)
            p.push(Promise.resolve(nc.flush()))
          })
      }
      await Promise.all(p)
    }
  } catch (e) {
    setFailed(JSON.stringify(e))
  }
})()

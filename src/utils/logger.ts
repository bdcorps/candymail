import { getConfig } from '../config'

const log = (messsage: string) => {
  console.log("sukh log trace", getConfig())
  const shouldTrace = getConfig()?.debug.trace;

  if (shouldTrace) {
    const date = new Date(Date.now())
    console.log(date, messsage)
  }
}
export { log }
import { getConfig } from '../config'

const log = (messsage: string) => {
  const shouldTrace = getConfig()?.debug.trace;

  if (shouldTrace) {
    const date = new Date(Date.now())
    console.log(date, messsage) // tslint:disable-line
  }
}
export { log }
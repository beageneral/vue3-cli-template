import { $$log } from '@utils/debug'
import { consoleDebug } from '@/config'

export function handleLog(logType, msg, content) {
  consoleDebug && $$log[logType](msg, content)
}

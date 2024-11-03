export function convertSecondsToTime(seconds: number) {
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const minutesString = minutes.toString().padStart(2, '0')
  const secondsString = secs.toString().padStart(2, '0')

  return `${minutesString}:${secondsString}`
}

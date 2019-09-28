/**
 * 日期格式化
 * @param date
 */
export default function dateFormat(date) {
  let dateTime = new Date(date)
  let getYear = dateTime.getFullYear()
  let getMonth = dateTime.getMonth()
  let getDay = dateTime.getDate()
  return `${getMonth}/${getDay}/${getYear}`
}

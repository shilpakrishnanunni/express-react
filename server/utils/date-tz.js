import moment from 'moment-timezone';
const localTZ = process.env.TIMEZONE;

export const convertToUTC = (date) => {
    return moment.tz(date,localTZ).format("YYYY-MM-DD HH:mm:ss");
}

export const convertToLocalTZ = (date) => {
    return moment.utc(date).tz(localTZ).format("YYYY-MM-DD HH:mm:ss");
}
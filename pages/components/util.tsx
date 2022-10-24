// output date format example: '2022-10-23 16:12:38' (SQL format)
const formatDate = ( raw:Date ):string => {
    return raw.toISOString().slice(0, 19).replace('T', ' ')
}

export { formatDate }
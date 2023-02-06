
const match = (field, data) => record => record[field] === data

const asyncRoute = route =>
  (req, res, next = console.error) =>
    Promise.resolve(route(req, res)).catch(next)

function error(error, description) {
  return {
    error,
    ...( description ? { description } : {})
  }
}

export {
  match,
  asyncRoute,
  error
}

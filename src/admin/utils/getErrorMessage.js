// Produces a message that actually tells the admin what went wrong, instead
// of a generic "could not load" — most support requests turn out to be
// "is the backend even running?" so that case gets called out explicitly.
export function getErrorMessage(err, fallback) {
  if (err?.response?.data?.message) return err.response.data.message
  if (err?.request && !err?.response) {
    return "Can't reach the API server. Make sure the backend is running and VITE_API_URL points to it."
  }
  return fallback
}

import { queryToObject } from "./generic"

// ...
if (window.location.search) {
  const params = queryToObject(window.location.search)
  if (params.state === LINKEDIN_STATE && window.opener) {
    window.opener.postMessage(params)
  }
}
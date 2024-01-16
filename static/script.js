// http://localhost:3000?uid=9c9da507-d79b-43ed-a97c-91f9baab23ab&target_id=1&type_id=3

const form = document.getElementById('form')

if (!getSearchParams()) {
  alert('False')
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const formData = new FormData(ev.currentTarget)
  const data = Object.fromEntries(formData.entries())
  const params = getSearchParams()
  if (!params) return
  console.log(data)
  fetch(`/api/v1/lead${window.location.search}`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      target_id: params.target_id,
    } ),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
})

function getSearchParams() {
  const search = new URLSearchParams(window.location.search)
  const uid = search.get('uid')
  const target_id = search.get('target_id')
  const type_id = search.get('type_id')

  if (uid && target_id && type_id) {
    return {
      uid,
      target_id,
      type_id,
    }
  }
  return null
}

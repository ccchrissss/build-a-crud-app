const update = document.querySelector('#update-button')

// attach the event listener to update button
// use fetch api to trigger put request
update.addEventListener('click', _ => {
  // fetch( endpoint, options )
  fetch( '/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote:  'I find your lack of faith disturbing.'
    }),
  })
})
const update = document.querySelector('#update-button')
const yodaMessageDiv = document.querySelector('#yoda-message')


// const windowLoadingComplete = window.addEventListener.('')

// 

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
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No Yoda quote to update') {

        yodaMessageDiv.textContent = 'No Yoda quotes left, but power hungry Darth Vader invades nonetheless. Watchout!'

        setTimeout( () => {
          window.location.reload()
        }, '3000')

      } else {
        // window.location.reload()
      }
    })
})


const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No more Darth Vader quotes to delete';
      } else {
        window.location.reload()
      }
    })
    .catch(error => console.error(error))
})
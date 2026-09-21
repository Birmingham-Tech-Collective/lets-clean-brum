import { useState } from 'react'
import './App.css'

function App() {
  const [eventId, setEventId] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      location: formData.get('location'),
      date_time: formData.get('dateTime')
    }

    const response = await fetch('http://127.0.0.1:8000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    setEventId(data.event_id)

    form.reset()
  }

  if (eventId) {
    return (
      <div>
        <h1>Event created successfully!</h1>
        <p>Your reference number is:</p>
        <strong>{eventId}</strong>
      </div>
    )
  }

  return (
    <div>
      <h1>Create a Clean-up Event</h1>
      <p>Fill in the details below to create an event.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Cannon Hill Park litter pick"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the clean-up event"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g. Cannon Hill Park, main gate"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="dateTime">Date & time</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            required
          />
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  )
}

export default App
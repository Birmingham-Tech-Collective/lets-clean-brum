import { useEffect, useState } from 'react'
import { API_BASE_URL } from './config'

function EventDetailPage({ eventId }) {
  const [event, setEvent] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`)

      if (response.status === 404) {
        setNotFound(true)
        return
      }

      const data = await response.json()
      setEvent(data)
    }

    fetchEvent()
  }, [eventId])

  if (notFound) {
    return (
      <div>
        <h1>Event not found</h1>
        <p>The clean-up event you are looking for does not exist.</p>
      </div>
    )
  }

  if (!event) {
    return <p>Loading event...</p>
  }

  return (
    <div>
      <h1>{event.title}</h1>

      <p>
        <strong>Description:</strong> {event.description}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Date & time:</strong> {event.date_time}
      </p>

      <p>
        <strong>Status:</strong> {event.status}
      </p>
    </div>
  )
}

export default EventDetailPage
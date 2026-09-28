import { useEffect, useState } from 'react'

function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('http://127.0.0.1:8000/events')
      const data = await response.json()

      setEvents(data)
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <h1>Upcoming Clean-ups</h1>

      {events.length === 0 ? (
        <p>No clean-ups scheduled yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Date & time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{event.date_time}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EventsPage
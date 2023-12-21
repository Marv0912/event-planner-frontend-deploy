import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5005/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event details: ', error);
      })
  }, [id]);

  if (event === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mt-4">
      
      <Link to={"/"} className="btn btn-secondary mb-3">Back</Link>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-center">{event.name}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="card-text">
            <strong>Time:</strong> {event.startTime} - {event.endTime}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="card-text">
            <strong>Category:</strong> {event.category}
          </p>
        </div>
        <div className="card-footer">
          <Link to={`/${id}/edit`} className="btn btn-primary">Edit Event</Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;

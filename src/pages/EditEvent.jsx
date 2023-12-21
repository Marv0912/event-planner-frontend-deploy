import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";


const EditEvent = ({ updateEvent }) => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5005/events/${id}`)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event details: ', error);
      })
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5005/events/${id}`, eventData)
      .then((response) => {
        console.log("Event updated: ", response.data);
        updateEvent(response.data);
        navigate(`/${id}`);
      })
      .catch((error) => {
        console.error("Error updating event:", error)
      })
  }

  if (!eventData) {
    return <div>Loading...</div>
  }
  return (
    <div className="container mt-4">
      <Link to={`/${id}`}>
        <button className="btn btn-secondary mb-3">Back</button>
      </Link>
      <h2 className="mb-4">Edit Event:</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Name:
          </label>
          <div className="col-md-10">
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Date:
          </label>
          <div className="col-md-10">
            <input
              type="date"
              id="date"
              className="form-control"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Description:
          </label>
          <div className="col-md-10">
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Location:
          </label>
          <div className="col-md-10">
            <input
              type="text"
              id="location"
              className="form-control"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Category:
          </label>
          <div className="col-md-10">
            <select
              id="category"
              className="form-select"
              name="category"
              value={eventData.category}
              onChange={handleInputChange}
            >
              <option value="Important">Important</option>
              <option value="Family">Family</option>
              <option value="Work">Work</option>
              <option value="Free-Time">Free-Time</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            Start Time:
          </label>
          <div className="col-md-10">
            <input
              type="time"
              id="startTime"
              className="form-control"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label fs-5">
            End Time:
          </label>
          <div className="col-md-10">
            <input
              type="time"
              id="endTime"
              className="form-control"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;

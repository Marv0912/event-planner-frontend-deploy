import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateEvent = ({ eventFormData, setEventFormData, onCreateEvent }) => {
    function generateUniqueId() {
        return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
    }
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        // destructure to get name and value of field
        const { name, value } = e.target;
        setEventFormData((prevData) => ({
            //spread operator to get data from useState
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = { ...eventFormData, id: generateUniqueId() };

        axios.post('http://localhost:5005/events', newEvent)
            .then((response) => {
                console.log('Event added: ', response.data);
                onCreateEvent(response.data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })

        navigate('/')
    }


    useEffect(() => {
        console.log(setEventFormData)
    }, [setEventFormData])
    return (
        <div className='container mt-4' >
            <Link to={"/"}>
                <button className='btn btn-secondary mb-3' >Back</button>
            </Link>

            <h2 className='mb-4' >Create Event</h2>
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
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;

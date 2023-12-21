import EventCard from "../components/EventCard";

const Home = ({ events, onDelete, searchQuery }) => {
    // Group events by date by using accumulator
    const eventsByDate = events.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {});

    // Sort events by start time within each date group
    for (const date in eventsByDate) {
        eventsByDate[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }

    const filteredEvents = searchQuery
        ? events.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : events;
    // Map through date groups and events to render them
    // return (
    //     <div className="container">
    //         <h1 className="row py-3" >Events:</h1>
    //         {Object.keys(eventsByDate).map((date) => (
    //             <div key={date}>
    //                 <h2 className="border-bottom" >{date}</h2>
    //                 <div>
    //                     {eventsByDate[date].map((event) => (
    //                         <div key={event.id} className="list-group-item">
    //                             <EventCard event={event} onDelete={onDelete} />
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div className="container">
            <h1 className="row py-3">Events:</h1>
            {Object.keys(eventsByDate).map((date) => (
                <div key={date}>
                    <h2 className="border-bottom">{date}</h2>
                    <div>
                        {eventsByDate[date]
                            .filter((event) =>
                                filteredEvents.some((filteredEvent) => filteredEvent.id === event.id)
                            )
                            .map((event) => (
                                <div key={event.id} className="list-group-item">
                                    <EventCard event={event} onDelete={onDelete} />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;

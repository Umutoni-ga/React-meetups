import {useHistory} from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';


function NewMeetup(){
    const history= useHistory();

    function addMeetupHandler(meetupdata){

        fetch('https://react-meetup-d30e7-default-rtdb.firebaseio.com/meetups.json', 
        {
            method: 'POST',
            body: JSON.stringify(meetupdata),
            headers: {
                'content-type':'application/json'
            }
        }).then(()=>{
            history.replace('/');
        });

    }

    return <section>
        <h1>Add a new meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
}

export default NewMeetup;
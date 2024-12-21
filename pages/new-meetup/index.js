  import { func } from 'prop-types';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

  export default function NewMeetUP(){
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData){
      const resoponse = await fetch('/api/new-meetup',{
        method:'POST',
        body:JSON.stringify(enteredMeetupData),
        headers:{'Content-Type':'application/json'}
      })
      const data = await resoponse.json()
      console.log(data)
      router.push('/')
    }
    return <NewMeetupForm onAddMeetup = {addMeetupHandler}/>
  }
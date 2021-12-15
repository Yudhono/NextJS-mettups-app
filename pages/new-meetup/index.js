// our-domain.com/new-meetup

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage () {

    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch("/api/new-meetup", {
          method: "POST",
          body: JSON.stringify(enteredMeetupData),
          headers: {
              'Content-Type': 'application/json'
          }
        });

        // -- get the response data
        const data = await response.json();

        console.log(data);
        // --  redirect back to home page after submitting the form
        router.push('/');
    }

    return (
      <Fragment>
        <Head>
          <title>Add a New Meetup</title>
          <meta
            name="description"
            content="Add Your Own Meetups and create amaxing networking opportunities"
          ></meta>
        </Head>
        <NewMeetUpForm onAddMeetup={addMeetupHandler} />
      </Fragment>
    );
}

export default NewMeetupPage;
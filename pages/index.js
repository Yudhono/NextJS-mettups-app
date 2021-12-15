import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from 'react';

function HomePage(props) {
    return (
      <Fragment>
        <Head>
          <title>React Meetups</title>
          <meta
            name="description"
            content="Browse a Huge List of highly active React Meetups"
          ></meta>
        </Head>
        <MeetupList meetups={props.meetups} />
      </Fragment>
    );
}

// export async function getServerSideProps(context) {

//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://yudhono:Yudh122Witanto@cluster0.ka0pr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1,
  };
}

export default HomePage;
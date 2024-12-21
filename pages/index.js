import Head from "next/head.js";
import MeetupList from "../components/meetups/MeetupList.js";
import { MongoClient } from "mongodb";
export default function HomePage({ meetups }) {
  console.log(meetups[0].title);
  return (
    <>
      <h1>Hello, this is the Home Page</h1>
      <Head>
        <title>
          Top Meetup Platform for Meet With New Peoples || Meetup Hub
        </title>
        <meta
          name="description"
          content="Discover top people to Meet, and share life goals. Start your healthy lifestyle today with meetup hub!"
        />
        <meta
          name="keywords"
          content="fitness, health tips, workout, diet plan, healthy lifestyle"
        />

        <meta
          property="og:title"
          content="Top Fitness Tips for a Healthy Lifestyle"
        />
        <meta
          property="og:description"
          content="Discover top fitness tips, healthy diet plans, and effective workout routines."
        />
        <meta
          property="og:image"
          content="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        />
        <meta property="og:url" content="https://meetuphub" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    // `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/meetups`
    process.env.MONGODB_URI
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const findMeetupData = await meetupCollection.find().toArray();
  console.log(findMeetupData);
  client.close();

  return {
    props: {
      meetups: findMeetupData.map((meetup) => ({
        title: meetup.title,
        address: meetup.address || "no address provided",
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

//   return {
//     props:{meetups:Meetups},
//     revalidate:1,
//   }
// }
// export async function getServerSideProps() {
//   const client = await MongoClient.connect(
//     `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/
// `
//   );
//   const db = client.db();
//   const meetupCollection = db.collection("meetups");
//   const findMeetupData = await meetupCollection.find().toArray();
//   client.close();

//   return {
//     props: {
//       meetups: findMeetupData.map((meetup) => ({
//         title: meetup.title,
//         address: meetup.address || "no address provided",
//         image: meetup.image,
//         id: meetup._id.toString(),
//       })),
//       // meetups: findMeetupData.map((meetup) => {
//       //   return {
//       //     title: meetup.title,
//       //     image: meetup.image,
//       //     address: meetup.address|| 'no address provided',
//       //     id:meetup._id.toString()
//       //   };
//       // }),
//     },
//     // revalidate: 1,
//   };
// }

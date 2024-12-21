import MeetUpDetails from "../../components/meetups/meetUp-details";
import { MongoClient, ObjectId } from "mongodb";
export default function SlugPage({ meetUpData }) {
  if (!meetUpData) {
    return <p>Loading...</p>; // Show a loading state while fallback generates the page
  }

  return (
    <MeetUpDetails
      image={meetUpData.image}
      title={meetUpData.title}
      address={meetUpData.address}
      description={meetUpData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    // `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/meetups`
    process.env.MONGODB_URI
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const findMeetupData = await meetupCollection.find({}, { _id: 1 }).toArray();
  console.log("Meetup IDs:", findMeetupData); // Log the data for debugging
  client.close();

  return {
    fallback: true, // Allow on-demand generation
    paths: findMeetupData.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const meetUpId = params.meetupId;

  const client = await MongoClient.connect(
    // `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/meetups`
    process.env.MONGODB_URI
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  let selctedMeetupData;
  try {
    selctedMeetupData = await meetupCollection.findOne({ _id: new ObjectId(meetUpId) });
  } catch (error) {
    console.error("Error fetching meetup data:", error);
    return { notFound: true }; // Return a 404 page for invalid `meetupId`
  }
  client.close();

  if (!selctedMeetupData) {
    return { notFound: true }; // Return 404 if no data is found
  }

  return {
    props: {
      meetUpData: {
        id: selctedMeetupData._id.toString(),
        title: selctedMeetupData.title,
        image: selctedMeetupData.image,
        address: selctedMeetupData.address,
        description: selctedMeetupData.description,
      },
    },
    revalidate: 1, // Revalidate data every second
  };
}

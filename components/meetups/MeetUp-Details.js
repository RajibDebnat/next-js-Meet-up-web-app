import classes from './MeetUp-details.module.css'
export default function MeetUpDetails({image,title,address,description}){
    return <section className={classes.section}>
        <img src={image} alt={title}/>
        <h1>{title}</h1>
        <address>{address}</address>
        <p>{description}</p>
    </section>
}
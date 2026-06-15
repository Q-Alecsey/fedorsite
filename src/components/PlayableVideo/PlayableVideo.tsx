
import styles from './PlayableVideo.module.scss'

interface Props{
    link: string,

}

const PlayableVideo = ({link}: Props) => {

    return (
        <video 
        src={link} 
        className={styles.video} 
        controls
        />
    )
}

export default PlayableVideo;



// const PlayableVideo = ({link}: Props) => {

//     const [showControls, setshowControls] = useState(false);

//     return (
//         <video 
//         src={link} 
//         className={styles.video} 
//         controls={showControls}
//         onMouseEnter={() => setshowControls(true)}
//         onMouseLeave={() => setshowControls(false)}
//         onTouchStart={() => setshowControls(true)}
//         />
//     )
// }
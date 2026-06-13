
import styles from './PlayableVideo.module.scss'

import {useState} from 'react'

interface Props{
    link: string,

}

const PlayableVideo = ({link}: Props) => {

    const [showControls, setshowControls] = useState(false);

    return (
        <video 
        src={link} 
        className={styles.video} 
        controls={showControls}
        onMouseEnter={() => setshowControls(true)}
        onMouseLeave={() => setshowControls(false)}
        onTouchStart={() => setshowControls(true)}
        />
    )
}

export default PlayableVideo;
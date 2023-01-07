import { ReactElement } from "react";
import { useVideo } from "../context/video";
import VideoTeaser from "../components/VideoTeaser";
import HomePageLayout from '../layout/Home'
import styles from "../styles/Home.module.css";
import { SimpleGrid } from "@mantine/core";

const Home = () => {
  const { videos } = useVideo()
  return <div className={styles.container}>
<SimpleGrid cols={3}>

        {videos.map((video) => {
          return <VideoTeaser key={video.videoId} video={video} />;
        })}
        </SimpleGrid>

  </div>
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
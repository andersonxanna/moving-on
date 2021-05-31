import React, { useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../styles/Fieldbook.scss';
import '../styles/Yearbook.scss';
import back from '../assets/fieldbook/back.jpeg';
import cover from '../assets/fieldbook/cover.jpeg';
import fish1 from '../assets/fieldbook/fish1.jpeg';
import fish2 from '../assets/fieldbook/fish2.jpeg';
import hermit1 from '../assets/fieldbook/hermit1.jpeg';
import hermit2 from '../assets/fieldbook/hermit2.jpeg';
import sandcrab1 from '../assets/fieldbook/sandcrab1.jpeg';
import sandcrab2 from '../assets/fieldbook/sandcrab2.jpeg';
import seal1 from '../assets/fieldbook/seal1.jpeg';
import seal2 from '../assets/fieldbook/seal2.jpeg';
import BlueXmas from '../assets/fieldbook/songs/Blue Christmas.mp3';
import Sun from '../assets/fieldbook/songs/Here Comes The Sun.mp3';
import Love from '../assets/fieldbook/songs/How Deep is Your Love.mp3';
import Space from '../assets/fieldbook/songs/Space Oddity.mp3';
import Casette from '../assets/fieldbook/smallCassette.png';
import Sound from 'react-sound';

const Page = React.forwardRef(function Page(props, ref) {
  return (
    <div className='fpage' ref={ref}>
      {props.children}
    </div>
  );
});

function Fieldbook() {
  const [currSong, setSong] = React.useState(0);
  const [currPage, setPage] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
    setPage(e.data);
    var songNum = 0;
    switch(e.data) {
      case 1:
      case 2:
        songNum = 0;
        break;
      case 3:
      case 4:
        songNum = 1;
        break;
      case 5:
      case 6:
        songNum = 2;
        break;
      case 7:
      case 8:
        songNum = 3;
        break;
      default:
        songNum = 0;
    }
    setSong(songNum);
    setIsPlaying(false);
  }, []);
  const bookRef = useRef();
  const goNextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const goPrevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  const songs = [
    Sun,
    Love,
    Space,
    BlueXmas,
  ];
  const songTitles = [
    'here comes the sun',
    'how deep is your love',
    'space oddity',
    'blue christmas',
  ];
  /*const colors = [
    "fieldbook-blue0-overlay",
    "fieldbook-blue1-overlay",
    "fieldbook-blue2-overlay",
    "fieldbook-blue3-overlay",
    "fieldbook-blue4-overlay",
  ];*/
  const pages = [
    {
      image: cover,
    },
    {
      image: hermit1,
    },
    {
      image: hermit2,
    },
    {
      image: seal1,
    },
    {
      image: seal2,
    },
    {
      image: fish1,
    },
    {
      image: fish2,
    },
    {
      image: sandcrab1,
    },
    {
      image: sandcrab2,
    },
    {
      image: back,
    },
  ];
  let songButton;
  if (currPage != 0 && currPage != 9) {
    console.log(songs[currSong]);
    songButton = <div style={{ gridColumnStart: 1 }} className = "topLeft">
    <Sound
     url = {songs[currSong]}
     playStatus = {
       isPlaying ? Sound.status.PLAYING: Sound.status.STOPPED
     }
    >
    </Sound>
    <button type="button" className = "cassette" onClick={() => setIsPlaying(!isPlaying)}><img src ={Casette} alt='SOMETHING'/></button>
    <span><br></br></span>
    <label className = "songTitle">{songTitles[currSong]}</label>
    </div>;
  }
  else {
    songButton = <div></div>;
  }
  return (
    <div className='fieldbook-page'>
      <HTMLFlipBook
        width={480}
        height={583}
        size='stretch'
        minWidth={480}
        maxWidth={480}
        minHeight={583}
        maxHeight={583}
        showCover={true}
        mobileScrollSupport={true}
        className='fieldbook'
        ref={bookRef}
        onFlip={onFlip}
      >
        {pages.map((page, index) => {
          return (
            <Page key={'page'+index} >
                <img src={page.image}></img>
            </Page>
          );
        })}
      </HTMLFlipBook>
      <div className="icon" onClick={goPrevPage} style={{ gridColumnStart: 1 }}>
          chevron_left {currPage}
      </div>
      {songButton}
      <div className="icon" onClick={goNextPage} style={{ gridColumnStart: 3 }}>
          chevron_right
      </div>
    </div>
  );
}
export default Fieldbook;
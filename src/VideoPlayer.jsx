import React, { useState, useRef, useEffect } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material'; //Material UI Library used
import ReactPlayer from 'react-player';
import trailer from './Oppenheimer.mp4'; //video(.mp4)
import subtitles from './subtitle.vtt'; //subtitle file

function VideoPlayer() {
  const [subtitlesVisible, setSubtitlesVisible] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [fontSize, setFontSize] = useState('3');
  const [fontColor, setFontColor] = useState('white');
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [appliedClassName, setAppliedClassName] = useState('');
  const playerRef = useRef(null);

  const fontSizeValues = {
    "1": "50%",
    "2": "75%",
    "3": "100%",
    "4": "200%"
  };

  const fontFamilyValues = {
    "Noto Serif": '"Noto Serif", serif',
    "Lobster": '"Lobster", cursive',
    "Caveat": '"Caveat", cursive',
    "Poppins": '"Poppins", sans-serif'
  };

  const getSubtitleClass = () => {
    // Generate the class name based on options selected for the subtitles
    const fontFamilyClass = fontFamily.replace(/ /g, "-");
    const className = `st-${fontFamilyClass}-${fontSize}-${fontColor}-${backgroundColor}`;

    // Update the applied class name
    const css = `
      .${className} {
        ::cue {
          font-family: ${fontFamilyValues[fontFamily]};
          font-size: ${fontSizeValues[fontSize]};
          color: ${fontColor};
          background-color: ${backgroundColor};
        }
      }\n`;

    // Inject the CSS
    setAppliedClassName(className);
    injectCSS(css);

    return className;
  };

  // Function to inject CSS into the document
  const injectCSS = (css) => {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  };

  // For enabling/disabling subtitles
  const toggleSubtitles = () => {
    const videoElement = playerRef.current?.getInternalPlayer();
    if (videoElement) {
      const textTracks = videoElement.textTracks;
      if (textTracks.length > 0) {
        textTracks[0].mode = subtitlesVisible ? 'hidden' : 'showing';
      }
      setSubtitlesVisible(!subtitlesVisible);
    }
  };

  //For visibility of subtitles' styling options
  const toggleOptionsVisibility = () => {
    setOptionsVisible(!optionsVisible);
  };


  //Real-time subtitle editing
  // Apply CSS when user changes the subtitle styling options
  useEffect(() => {
    getSubtitleClass();
  }, [fontFamily, fontSize, fontColor, backgroundColor]);


  
  // UI
  return (
    <div style={{background:'linear-gradient(180deg, rgba(9,23,75,1) 6%, rgba(14,23,62,1) 16%, rgba(0,0,0,1) 72%)', height:'110vh'}}>
      <div className={`${appliedClassName}`}>
        <ReactPlayer
          ref={playerRef}
          url={trailer}
          controls={true}
          style={{marginLeft:'auto',marginRight:'auto',paddingTop:'20px'}}
          width="90%"
          height="100%"
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous'
              },
              tracks: [
                {
                  kind: 'subtitles',
                  src: subtitles,
                  srcLang: 'en',
                  label: 'English',
                  default: true,
                },
              ],
            },
          }}
        />
        <Grid container>
          <Grid item lg={2.5} >
        {/*Button for visibility of subtitles*/}
        <Button onClick={toggleSubtitles} style={{display:'flex',flexDirection:'flex-end',marginLeft:'100px',marginTop:'20px',width:'200px',backgroundColor:'#061034',color:'#fff',border:'1px grey solid'}}>
          {subtitlesVisible ? 'Hide Subtitles' : 'Show Subtitles'}
        </Button>
        </Grid>
        <Grid item lg={2.5}>
        {/*Button for visibility of subtitles' styling options*/}
        <Button variant="text" onClick={toggleOptionsVisibility} style={{display:'flex',marginLeft:'100px',marginRight:'80px',flexDirection:'flex-end',marginTop:'20px',width:'200px',backgroundColor:'#061034',color:'#fff',border:'1px grey solid'}}>
          {optionsVisible ? 'Hide Subtitle Options' : 'View Subtitle Options'}
        </Button>
        </Grid>
        <Grid item sx={{marginLeft: {sm:'3%',lg:'12%'}}} sm={10} lg={5}>
        {optionsVisible && (
          <div className="subtitle-options" style={{marginTop:'20px'}}>
            {/*Options*/}

            {/* FONT FAMILY */}
            <FormControl className="subtitle-form-control" style={{ width: '22%',color:'white',backgroundColor:'#1e1e1e',borderRadius:'15px' }}>
              <InputLabel style={{color:'#fff'}}>Font Family</InputLabel>
              <Select style={{color:'#fff',backgroundColor:'#1e1e1e',borderRadius:'15px'}} value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="Poppins">Poppins</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="Noto Serif">Noto Serif</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="Lobster">Lobster</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="Caveat">Caveat</MenuItem>
              </Select>
            </FormControl>

            {/* FONT SIZE */}
            <FormControl className="subtitle-form-control" style={{ width: '22%',color:'white',backgroundColor:'#1e1e1e',borderRadius:'15px',marginLeft:'5px' }}>
              <InputLabel style={{color:'#fff'}}>Font Size</InputLabel>
              <Select  style={{color:'#fff',backgroundColor:'#1e1e1e',borderRadius:'15px'}}  value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="1">50%</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="2">75%</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="3">100%</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="4">200%</MenuItem>
              </Select>
            </FormControl>

            {/* FONT COLOR */}
            <FormControl className="subtitle-form-control" style={{ width: '22%',color:'white',backgroundColor:'#1e1e1e',borderRadius:'15px',marginLeft:'5px' }}>
              <InputLabel style={{color:'#fff'}}>Font Color</InputLabel>
              <Select  style={{color:'#fff',backgroundColor:'#1e1e1e',borderRadius:'15px'}}  value={fontColor} onChange={(e) => setFontColor(e.target.value)}>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="white">White</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="black">Black</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="yellow">Yellow</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="red">Red</MenuItem>
              </Select>
            </FormControl>

            {/* BACKGROUND COLOR */}
            <FormControl className="subtitle-form-control" style={{ width: '22%',color:'white',backgroundColor:'#1e1e1e',borderRadius:'15px',marginLeft:'5px'  }}>
              <InputLabel style={{color:'#fff'}}>Background Color</InputLabel>
              <Select  style={{color:'#fff',backgroundColor:'#1e1e1e',borderRadius:'15px'}}  value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="black">Black</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="white">White</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="cyan">Cyan</MenuItem>
                <MenuItem style={{color:'#fff',backgroundColor:'#1e1e1e'}} value="magenta">Magenta</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default VideoPlayer;

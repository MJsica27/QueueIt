import React from 'react' 
import img2 from '../../Assets/img/img2.png';
import img7 from '../../Assets/img/img7.png';

export default function AdviserBackgroundPage({opac}) {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] overflow-hidden">
            {/* <div className="absolute pointer-events-none">  */}
                <img src={img7} alt='illustration' style={{top:-150,left:-450,height:'200dvh', aspectRatio:1, position:'absolute',transform:'rotate(-90deg)', opacity:opac, minHeight:'300px'}} />
                <img src={img2} alt='illustration' style={{bottom:-250,right:-250, height:'100dvh', aspectRatio:1, position:'absolute', opacity:opac, minHeight:'500px'}} />
            {/* </div> */}
        </div>
      );
}

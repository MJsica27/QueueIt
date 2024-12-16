import React from 'react' 
import img2 from '../../Assets/img/img2.png';
import img7 from '../../Assets/img/img7.png';

export default function AdviserBackgroundPage() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]">
            <div className="absolute pointer-events-none"> 
                <img src={img7} alt='illustration' style={{ marginTop: '-170px', marginLeft: '-320px' }} />
                <img src={img2} alt='illustration' style={{ marginTop: '-600px', marginLeft: '890px' }} />
            </div>
        </div>
      );
}

import React, { useState } from 'react';
import Footer from './footer';

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
console.log(props.children.key, isVisible)
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function Cover({ props} ) {

  const [color,setColor]  = useState('');

  // const colorer =()=>{
  //   setColor(color + 1);
  //   return color
  // }
  console.log(props.id);
  const functionHandler = () => {
    console.log(props.backgroundColor);
    props.passBackgroundColor(props.backgroundColor);
    
    }
    
  return (
    <>
     
      <FadeInSection key={`${props.backgroundColor}`}
      >
              
              <div className="background" style={{
            backgroundColor: `var(${props.backgroundColor})`
          }}></div></FadeInSection> 
        <section
          className={`section${props.id}`}
          data-anchor={`issue${props.id}`}
          id={`issue${props.id}`}
          data-color={`var(${props.backgroundColor})`}
          
        >
          <img
            src={props.img}
            alt={`Backstage talks Issue ${props.id}`}
            className='cover'
          />
          <h2>
            Issue #{props.id} {!props.available && <> is sold out</>}
          </h2>

          {props.available && (
            <div>
              <p className='avail'>
                <a
                  href={`${props.linkToBuy}`}
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    color: `var(${props.linkColor})`,
                  }}
                >
                  BUY HERE
                </a>
              </p>
            </div>
          )}
          <p className='avail'>
            {props.available && <>or in </>}
            {!props.available && (
              <>If you are lucky, you may get the last pieces in </>
            )}
            <a
              href='http://backstagetalks.com/stocklist.php'
              target='_blank'
              rel='noreferrer'
              style={{
                color: `var(${props.linkColor})`,
              }}
            >
              selected stores
            </a>
            .
          </p><div className="desktop"><Footer ></Footer>  </div>
      </section>
          
      {/* </FadeInSection> */}
      
     
    </>
  );

 
}

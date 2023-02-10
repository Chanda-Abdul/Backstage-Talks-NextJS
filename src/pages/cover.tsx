export default function Cover({props}) {
    return <div> {props.record.map(r => {
      return (
        <section
          key={`${r.id}`}
          className='section'
          data-anchor={`issue${r.id}`}
          id={`issue${r.id}`}
          style={{
            backgroundColor: `var(${r.backgroundColor})`
          }}
        
        >
          <img
            src={r.img}
            alt={`Backstage talks Issue ${r.id}`}
            className='cover'
          />
          <h2>
            Issue #{r.id} {!r.available && <> is sold out</>}
          </h2>

          {r.available && (
            <div className='avail'>
              <h3>
                <a href={`${r.linkToBuy}`}
                 style={{
                  color: `var(${r.linkColor})`
                }}>
                  BUY HERE
                </a>
              </h3>
            </div>
          )}
          <p>
            {r.available && <>or in </>}
            {!r.available && (
              <>If you are lucky, you may get the last pieces in </>
            )}
            <a href='http://backstagetalks.com/stocklist.php'
            style={{
              color: `var(${r.linkColor})`}}>
               selected stores
            </a>
            .
          </p>
        </section>
      );
    })}</div>
  }
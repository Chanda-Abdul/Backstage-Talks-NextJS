export default function Footer( ) {
    return(<footer className='footer'>
    <p className='description'>
      Backstage Talks is a&nbsp;magazine of&nbsp;casual, but in&nbsp;depth
      dialogues on&nbsp;design and business. Our decisions shape and
      influence this complex world—to have a&nbsp;chance to&nbsp;make the
      right ones, we need to talk.
      <h4 className='copyright'>
        <span>
          &copy; 2023{' '}
          <a href='http://milk.sk/' target='_blank' rel='noreferrer'>
            Published by studio Milk
          </a>
          .
        </span>
        <span>
          Coded by <a href=''>Chanda Abdul</a>
        </span>
      </h4>
      <h5>
        <a href='/privacy-policy.php'>Privacy Policy</a>
      </h5>
    </p>
    <ul className='menu'>
      {/* TO-DO => make dynamic list */}
      <li>
      <p><a className='menulink issue6' href='#issue6'>
          Issue #6
        </a></p>
      </li>
      <li>
      <p><a className='menulink issue5' href='#issue5'>
          Issue #5
        </a></p>
      </li>
      <li>
      <p><a className='menulink issue4' href='#issue4'>
          Issue #4
        </a></p>
      </li>
      <li>
      <p><a className='menulink issue3' href='#issue3'>
          Issue #3
        </a></p>
      </li>
      <li>
      <p><a className='menulink issue2' href='#issue2'>
          Issue #2
        </a></p>
      </li>
      <li><p> <a className='menulink issue1' href='#issue1'>
          Issue #1
        </a></p>
       
      </li>
    </ul>
    <p className='contact'>
      <a href='mailto:info@backstagetalks.com'>info@backstagetalks.com</a>
    </p>
  </footer>)
}
import { Link } from 'react-router-dom'
import '../../assets/css/section/_section.css'; //css

const Nav = () => {
    return (
        <div className='Nav_wrap'>
            <Link to='/'></Link>
            <Link to='/mypage'></Link>
        </div>
    )
}

export default Nav
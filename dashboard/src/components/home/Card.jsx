import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ serviceName, count, link, icon }) => {
    return (
        <Link to={link}>
            <div className='w-60 h-60 shadow-md bg-white rounded-md flex items-center justify-center'>
                <div className=''>
                    <div className='flex justify-center mb-10 text-secondary_color'>
                        {icon}
                    </div>
                    <div className='text-center'>
                        <p className='text-xl'>{serviceName}</p>
                    </div>
                    <center className='text-4xl font-semibold text-primary_color'>{count}</center>
                </div>
            </div>
        </Link>
    )
}

Card.propTypes = {
    serviceName: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
}

export default Card
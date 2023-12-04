import PropTypes from 'prop-types';

const Card = ({ serviceName, count, icon }) => {
    return (
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
    )
}

Card.propTypes = {
    serviceName: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired
}

export default Card
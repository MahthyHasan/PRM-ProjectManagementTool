import './Card.scss'

const Card = props => {
    return (
        <div className='card_1'>
            {props.children}
        </div>
    )
}

export default Card
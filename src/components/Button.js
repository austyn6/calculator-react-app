const Button = ( { buttonData, handleClick } ) => {
    
    return (
        <button onClick={() => handleClick(buttonData.value, buttonData.type)} className={buttonData.className} id='bubbly-button'>{buttonData.text}</button>
    )
}

export default Button
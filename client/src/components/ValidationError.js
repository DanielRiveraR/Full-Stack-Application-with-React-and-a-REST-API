const ValidationError = (props) => {
    const errors = [props.data];

    return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
            {
                errors[0][0].errors.map((error, index) => (
                    <li key={index}>{`${errors[0][0].errors[index]}`}</li>
                ))
            }
            </ul>
        </div>
    );
}

export default ValidationError;
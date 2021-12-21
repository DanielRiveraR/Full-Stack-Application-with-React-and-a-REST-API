import React from 'react';

const ValidationHeader = (props) => {
    const errors = props.data;
    console.log(errors);

    return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
                <ul>
                    {errors.message}
                </ul>
        </div>
    );
}

export default ValidationHeader;
import React from 'react';
// CSS Sheet
import './ColorPicker.css'

const ColorPicker = (props) => {
    return (
        <div>
            {props.colors.map((color, idx) => 
            <div className="ColorPicker-color">

            </div>
            )}
        </div>
    );
}

export default ColorPicker;
import React from 'react';
// CSS Sheet
import './ColorPicker.css'

const ColorPicker = (props) => {
    return (
        <div>
            {props.colors.map((color, idx) => 
            <div 
            className="ColorPicker-color"
            key={color}
            onClick={() => props.handleColorSelection(idx)}
            style={{
                backgroundColor: props.selColorIdx === idx ? 'white' : color, 
                border: props.selColorIdx === idx ? `14px solid ${color}` : false
            }}>

            </div>
            )}
        </div>
    );
}

export default ColorPicker;
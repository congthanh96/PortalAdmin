
import React from 'react';
import { Button } from 'antd';
import './buttonComponent.css'

const ButtonComponent = ({children,onClick,isLoading}) =>{
    return(
        <Button loading={isLoading} className='css-button' onClick={onClick}>
            {children}
        </Button>
    )
}
export default ButtonComponent
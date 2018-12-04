import React from 'react'
import {Typography} from "@material-ui/core";

export const InfoElement = (props) => {
    const {caption, body, className} = props

    return(
        <div>
            <Typography variant="caption" gutterBottom align="left" className={className}>
                {caption}:
                <Typography variant="body1" gutterBottom align="left" className={className}>
                    {` ${body}`}
                </Typography>
            </Typography>
        </div>
    )
}
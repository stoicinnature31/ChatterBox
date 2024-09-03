import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { blue } from '../../constants/color';
import moment from 'moment';
import { fileFormat } from '../../library/features';
import RenderAttachment from '../Shared/RenderAttachment'

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;

    // const timeAgo = moment(createdAt).fromNow();
    const timeAgo =  moment(createdAt, moment.ISO_8601).isValid()
    ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
    : moment(new Date(createdAt).toISOString()).format('MMMM Do YYYY, h:mm a');;
    // const timeAgo = moment(createdAt).format('h:mm a');

    const sameSender = sender?._id === user?._id
    return (
        <div style={{
            alignSelf: sameSender ? "flex-end" : "flex-start",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            padding: "0.5rem",
            width: "fit-content",
        }}>
            {!sameSender && <Typography color={blue} fontWeight={"600"} variant='body2'>{sender.name}</Typography>}

            {content && <Typography variant='body1'>{content}</Typography>}

            {attachments.length > 0 && attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);

                return <Box key={index}>
                    <a href={url} target='_blank' download style={{
                        color: "black",
                    }}> {RenderAttachment(file, url)}</a>
                </Box>
            })}

            <Typography variant='caption' color={"blue"} fontWeight={"bold"}>{timeAgo}</Typography>
        </div>
    )
}

export default memo(MessageComponent)

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChatBoxVisibility } from 'redux/productSlice';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTheme, Grow, Box, Typography, IconButton, Button, Divider, InputBase, Skeleton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';



const style = {
    container: {
        height: { md: '500px', xs: '100vh' },
        // height: { md: '65vh', xs: '100vh' },
        width: { md: '350px', xs: '100%' },
        backgroundColor: 'bg.secondary',
        position: 'fixed',
        right: { md: '30px', xs: '0px' },
        bottom: { xm: '100px', md: '160px', xs: '0px' },
        zIndex: 3000,
        borderRadius: { md: '8px', xs: '0px' },
        overflow: 'hidden'
    },
    conversationsHeader: {
        height: '75px',
        backgroundColor: 'bg.space',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    heading: {
        fontSize: '20px',
        color: 'text.white',
        textAlign: 'center',
        fontWeight: 500
    },
    chatBoxCloseBtn: {
        position: 'absolute',
        right: '10px',
        top: '20px',
        display: { md: 'none', xs: 'inline' }
    },
    allConversations: {
        height: 'calc(100% - 75px)',
        overflow: 'auto'
    },
    conversationItem: {
        padding: '16px',
        width: '100%',
        position: 'relative'
    },
    conversationOverview: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    avatarContainer: {
        position: 'relative',
        height: '45px',
        width: '45px',
        marginRight: '20px'
    },
    conversationOverviewMessageAuthorName: {
        fontSize: '16px',
        fontWeight: 600,
        color: 'text.primary',
        textTransform: 'capitalize',
        textAlign: 'left',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    conversationOverviewMessageText: {
        fontSize: '14px',
        fontWeight: 400,
        color: 'text.light',
        textTransform: 'capitalize',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    arrowIcon: {
        position: 'absolute',
        right: '16px',
        top: '28px',
        fontSize: '25px',
        color: 'text.primary'
    },
    backToConversationsBtn: {
        position: 'absolute',
        left: '10px',
        top: '15px'
    },
    userInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px'
    },
    sendMessageArea: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        height: 'auto',
        width: '100%',
        backgroundColor: 'bg.secondary'
    },
    messageInput: {
        height: '100%',
        width: '100%',
        lineHeight: 1.33,
        fontSize: '14px',
        color: 'text.primary',
        fontWeight: 400,
        padding: '18px 100px 18px 29px'
    },
    iconBtn: {
        position: 'absolute',
        top: '17px',
        fontSize: '23px',
        color: 'text.primary',
        right: '29px',
        cursor: 'pointer'
    },
    messagesList: {
        height: 'auto',
        maxHeight: 'calc(100% - 131px)',
        overflow: 'auto',
        padding: '16px'
    },
    message: {
        padding: '17px 20px',
        borderRadius: '5px',
        marginBottom: '8px',
        width: 'auto',
        maxWidth: '80%',
        fontSize: '14px',
        fontWeight: 400
    },
    onlyEmojiMessage: {
        fontSize: '30px',
        marginBottom: '8px'
    },
    myMessage: {
        color: 'text.white',
        backgroundColor: 'bg.azureBlue'
    },
    otherMessage: {
        color: 'text.primary',
        backgroundColor: 'bg.silver'
    }
}

const messagesList = [
    {
        author: 'me',
        isEmojiOnly: false,
        text: 'Hello how are you?'
    },
    {
        author: 'me',
        isEmojiOnly: false,
        text: 'What are you doing these days?'
    },
    {
        author: 'me',
        isEmojiOnly: true,
        text: '😃'
    },
    {
        author: 'other',
        isEmojiOnly: false,
        text: 'Fine'
    },
    {
        author: 'other',
        isEmojiOnly: true,
        text: '😍'
    },
    {
        author: 'other',
        isEmojiOnly: true,
        text: '💝'
    },
    {
        author: 'other',
        isEmojiOnly: false,
        text: 'What about you?, Ap sunao kese ho aj kal kya chal rha ha. Ghar sab thek ha?'
    } 
]
const Message = ( { message } )=>{
    return(
        <Box sx={{ display: 'flex', justifyContent: message.author==='me' ? 'flex-end' : 'flex-start' }}>
            <Typography 
                variant='body1' 
                sx={message.isEmojiOnly ? style.onlyEmojiMessage : message.author==='me' ? {...style.message, ...style.myMessage } : {...style.message, ...style.otherMessage }}
            >{message.text}</Typography>
        </Box>
    )
}
const ChatBox = ( { fromAdmin } ) => {

    const { showChatBox } = useSelector((state)=>state.product);
    const [isConversationsFetched, setIsConversationsFetched] = useState(false);
    const [isMessagesFetched, setIsMessagesFetched] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [showMessages, setShowMessages] = useState(false);
    const [typedMessage, setTypedMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [user, setUser] = useState('user'); // temporary state, it will be fetch from redux store
    const messageInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();




    useEffect(()=>{
        if(user){
            // here write code to fetch all conversations(chats)
            setTimeout(()=>{ // written just to demo the skeleton ui
                setIsConversationsFetched(true);
            }, 1000)
        }
    }, [])

    useEffect(()=>{
        if(showMessages){
            // here write code to fetch all messages of selected chat
            setTimeout(()=>{ // written just to demo the skeleton ui
                setIsMessagesFetched(true);
            }, 3000)
        }
    }, [showMessages])
    

    useEffect(()=>{
        if(isMessagesFetched){
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [isMessagesFetched])




    
    const sendMessage = (emoji)=>{
        // if there is emoji present means user just want to send emoji only to user
        // then directly send that emoji to user
        // messageSchema = {
        //     message: emoji,
        //     isOnlyEmoji: true
        //     ...otherfields
        // }
        // I'm doing this only to show only emoji message in different style than text or
        // text + emoji message to user(e.g onlyEmoji message will have large text font size
        // and no background color when displayed just like mongodb atlas message style
        // of which screenshoot I have saved in my phone as favorite)
        if(emoji){

        }
        // else user want to send only text or text+emoji
        // emojiSchema = {
        //     message: typedMessage,
        //     isOnlyEmoji: false
        //     ...otherfields
        // }
        else{

        }
    }
    return (
        <Grow in={showChatBox}>
            <Box 
                sx={fromAdmin ? {...style.container, bottom: { md: '100px', xs: '0px'  }} : {...style.container, bottom: { xm: '100px', md: '160px', xs: '0px'  }}}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                {
                    showMessages
                    ?
                    <>
                    <Box 
                        sx={style.conversationsHeader}
                        style={{ justifyContent: 'flex-start', paddingLeft: '50px' }}
                    >
                        <Box sx={style.userInfoContainer}>
                            <Box sx={style.avatarContainer}>
                                <Image
                                    src='/images/man.svg'
                                    alt='profileImage'
                                    layout='fill'
                                    placeholder='blur'
                                    blurDataURL='/images/man.svg'
                                />
                            </Box>
                            <Box>
                                <Typography 
                                    variant='h2' 
                                    sx={style.heading} 
                                    style={{ fontSize: '15px' }}
                                >Faheem Hassan</Typography>
                                <Typography 
                                    variant='body1'
                                    sx={style.conversationOverviewMessageText}
                                    style={{ fontSize: '13px' }}
                                >Online</Typography>
                            </Box>
                        </Box>
                        <IconButton 
                            sx={style.backToConversationsBtn} 
                            onClick={()=>{ 
                                setShowMessages(false)
                                setSelectedChatId(null)
                                setIsMessagesFetched(false)
                            }}
                        >
                            <KeyboardArrowLeftIcon sx={{ color: 'text.white', fontSize: '30px' }}/>
                        </IconButton>
                    </Box>

                    <Box sx={style.messagesList}>
                        {
                            isMessagesFetched
                            ?
                            messagesList.map((message, index)=>{
                                return <Message key={index} message={message}/>
                            })
                            :
                            [1,2,3,4,5].map((item)=>{
                                return(
                                    <Box 
                                        key={item} 
                                        sx={{ display: 'flex', justifyContent: item%2==0 ? 'flex-start' : 'flex-end' }}
                                    >
                                        <Skeleton 
                                            variant='rectangular' 
                                            height={item===1 ? 60 : item===2 ? 80 : item===3 ? 40 : item===4 ? 60 : item===5 ? 50 : null} 
                                            width={item===1 ? '50%' : item===2 ? '70%' : item===3 ? '80%' : item===4 ? '50%' : item===5 ? '60%' : null} 
                                            animation='wave' 
                                            style={{ marginBottom: '8px', borderRadius: '5px' }}
                                            sx={item%2===0 ? { bgcolor: 'bg.silver' } : { bgcolor: 'bg.azureBlue' }} 
                                        />
                                    </Box>
                                )
                            })
                        }
                        <Box ref={messagesEndRef}></Box>
                    </Box>

                    <Box 
                        sx={style.sendMessageArea}
                        style={{ borderTop: `1px solid ${theme.palette.text.fadedSilver}`}}
                    >
                        <InputBase
                            required
                            multiline
                            autoFocus
                            maxRows={10}
                            type='text'
                            placeholder='Start typing...'
                            style={style.messageInput}
                            value={typedMessage}
                            onChange={(e)=>setTypedMessage(e.target.value)}    
                            inputRef={messageInputRef}
                        />
                        {
                            showEmojiPicker
                            ?
                            <EmojiEmotionsIcon sx={{...style.iconBtn, right: typedMessage.trim().length ? '69px' : '29px' }}/>
                            :
                            <SentimentSatisfiedAltIcon sx={{...style.iconBtn, color: 'text.secondaryLight', right: typedMessage.trim().length ? '69px' : '29px' }} onClick={()=>setShowEmojiPicker(true)}/>
                        }
                        {
                            typedMessage.trim().length
                            ?
                            <SendIcon sx={{...style.iconBtn }} onClick={sendMessage}/>
                            :
                            null
                        }
                        {
                            showEmojiPicker
                            ?
                            <Box sx={{ position: 'absolute', bottom: '100%' }}>
                                <Picker 
                                    data={data} 
                                    onEmojiSelect={(emojiData)=>{
                                        setShowEmojiPicker(false)
                                        if(typedMessage.trim().length){
                                            setTypedMessage(typedMessage+emojiData.native);
                                        }
                                        else{
                                            sendMessage(emojiData.native);
                                        }
                                        messageInputRef.current.focus()
                                    }} 
                                    onClickOutside={()=>setShowEmojiPicker(false)}
                                />
                            </Box>
                            :
                            null
                        }
                    </Box>
                    </>
                    :
                    <>
                    <Box sx={style.conversationsHeader}>
                        <Typography variant='h2' sx={style.heading}>Your conversations</Typography>
                        <IconButton sx={style.chatBoxCloseBtn} onClick={()=> dispatch(toggleChatBoxVisibility(false))}>
                            <CloseIcon sx={{ color: 'text.white' }}/>
                        </IconButton>
                    </Box>
                    {
                        user
                        ?
                        <Box sx={style.allConversations}>
                            {
                                isConversationsFetched
                                ?
                                [1,2,3,4,5,6].map((conversation)=>{
                                    return(
                                        <Box key={conversation}>
                                            <Button 
                                                sx={style.conversationItem}
                                                onClick={()=>{
                                                    setSelectedChatId(conversation)
                                                    setShowMessages(true)
                                                }}
                                            >
                                                <Box sx={style.conversationOverview}>
                                                    <Box sx={style.avatarContainer}>
                                                        <Image
                                                            src='/images/man.svg'
                                                            alt='profileImage'
                                                            layout='fill'
                                                            placeholder='blur'
                                                            blurDataURL='/images/man.svg'
                                                        />
                                                    </Box>
                                                    <Box sx={{ width: 'calc(100% - 90px)' }}>
                                                        <Typography 
                                                            variant='h6'
                                                            sx={style.conversationOverviewMessageAuthorName}
                                                        >Faheem Hassan</Typography>
                                                        <Typography
                                                            variant='body1'
                                                            sx={style.conversationOverviewMessageText}
                                                        >Hello how are you I think you will be fine, I want to meet you please, I am a your big fan</Typography>
                                                    </Box>
                                                </Box>
                                                <KeyboardArrowRightIcon sx={style.arrowIcon}/>
                                            </Button>
                                            <Divider light={true}/>
                                        </Box>
                                    )
                                })
                                :
                                [1,2,3,4,5].map((item)=>{
                                    return(
                                        <Box key={item} sx={{...style.conversationItem, ...style.conversationOverview }}>
                                            <Skeleton sx={{ bgcolor: 'bg.silver' }} variant='circular' height={45} width={45} animation='wave'/>
                                            <Box ml='20px' style={{ width: 'calc(100% - 55px)' }}>
                                                <Skeleton sx={{ bgcolor: 'bg.silver' }} height={20} width='40%' animation='wave'/>
                                                <Skeleton sx={{ bgcolor: 'bg.silver' }} height={20} width='80%' animation='wave'/>
                                            </Box>
                                        </Box>
                                    )  
                                })
                            }
                        </Box>
                        :
                        <Grid 
                            container 
                            justifyContent='center' 
                            alignItems='center'
                            gap={1}
                            sx={{ height: 'calc(100% - 75px)'}}
                        >
                            <Grid item>
                                <Button
                                    sx={{ color: 'bg.azureBlue', textTransform: 'capitalize'}}
                                    onClick={()=>{
                                        dispatch(toggleChatBoxVisibility(false))
                                        router.push('/register')
                                    }}
                                >Signup</Button>
                            </Grid>
                            <Grid item>
                                /
                            </Grid>
                            <Grid>
                                <Button
                                    sx={{ color: 'bg.azureBlue', textTransform: 'capitalize'}}
                                    onClick={()=>{
                                        dispatch(toggleChatBoxVisibility(false))
                                        router.push('/login')
                                    }}
                                >Login</Button>
                            </Grid>
                        </Grid>
                    }
                    </>
                }
            </Box>
        </Grow>
    )
}

export default ChatBox;
import Box from '@material-ui/core/Box'

export const Loading = (): JSX.Element => {
  return (
    <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center' position='fixed' top={0}>
      <Box width='100%' height='100%' position='absolute' style={{ opacity: 0.3 }} />
      <Box width='100%' height='100%' position='absolute' zIndex={1} display='flex' alignItems='center' justifyContent='center'>
        <img src={`${process.env.ROOT_URL}:${process.env.APP_PORT}/icons/loading.svg`} />
      </Box>
    </Box>
  )
}

export default Loading

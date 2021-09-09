import { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import ResetIcon from '@material-ui/icons/Cached'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles } from '@material-ui/styles'
import LoadingIcon from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      // [theme.breakpoints.down(600)]: {},
    },
    textField: {
      width: '35ch',
    },
  }),
)

export type Props = {
  isLoading?: boolean
  onSearch: (value: string) => void
  onReset: () => void
}

export const Search = (props: Props): JSX.Element => {
  const { isLoading, onSearch, onReset } = props
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleReset = () => {
    setValue('')
    onReset()
  }

  return (
    <Box className={classes.root}>
      <TextField style={{ width: '100%' }} label='Keyword' value={value} onChange={e => setValue(e.target.value)} />

      <Button
        startIcon={isLoading ? <LoadingIcon /> : <SearchIcon />}
        className='button'
        variant='contained'
        color='primary'
        style={{ width: 150, height: 40 }}
        onClick={() => onSearch(value)}
      >
        Search
      </Button>

      <Button
        startIcon={<ResetIcon />}
        className='button'
        variant='contained'
        color='default'
        style={{ width: 130, height: 40 }}
        onClick={handleReset}
      >
        Reset
      </Button>
    </Box>
  )
}

export default Search

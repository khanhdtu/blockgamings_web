import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import SearchIcon from '@material-ui/icons/Search'
import LoadingIcon from '@material-ui/core/CircularProgress'
import ResetIcon from '@material-ui/icons/Cached'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { Box, Button, TextField } from '@material-ui/core'
import { Props } from './types'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  search: {
    [theme.breakpoints.down(600)]: {
      flexDirection: 'column',
      '& .search-option, & .MuiFormControl-marginNormal': {
        width: '100% !important',
        margin: '0px !important',
        '&:nth-child(5)': {
          marginTop: '10px !important',
        },
      },
    },
  },
}))

export const SearchWithOptions = (props: Props): JSX.Element => {
  const { isLoading, onSearch, onReset } = props
  const [keyWord, setKeyWord] = React.useState('')
  const [dateFrom, setDateFrom] = React.useState<number | null>(null)
  const [dateTo, setDateTo] = React.useState<number | null>(null)
  const [status, setStatus] = React.useState<string>('')
  const classes = useStyles()

  const allStatus = [
    {
      label: 'Completed',
      value: 'COMPLETED',
    },
    {
      label: 'Processing',
      value: 'PROCESSING',
    },
    {
      label: 'Pending',
      value: 'PENDING',
    },
    {
      label: 'Canceled',
      value: 'CANCELED',
    },
  ]

  const handleSearch = () => {
    const payload: any = {}
    if (keyWord) payload.keyWord = keyWord
    if (dateFrom) payload.dateFrom = dateFrom
    if (dateTo) payload.dateTo = dateTo
    if (status) payload.status = status
    onSearch(payload)
  }

  const handleReset = () => {
    setKeyWord('')
    setDateFrom(null)
    setDateTo(null)
    onReset()
  }

  const handleDateChange = (date: MaterialUiPickersDate, key: string) => {
    if (date) {
      const year = date?.getUTCFullYear()
      const month = (date?.getUTCMonth() ?? 0) + 1
      const day = date?.getUTCDate()
      if (key === 'dateFrom') {
        setDateFrom(new Date(`${year}-${month}-${day} 00:01`).getTime())
      } else {
        setDateTo(new Date(`${year}-${month}-${day} 23:59`).getTime())
      }
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={classes.search} display='flex'>
        <Box className='search-option' mt={2} width={200}>
          <TextField
            style={{ width: '100%' }}
            id='standard-basic'
            label='Keyword'
            value={keyWord}
            onChange={e => setKeyWord(e.target.value)}
          />
        </Box>
        <Box className='search-option' ml={2} width={160}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline-start'
            label='Date from'
            value={dateFrom}
            onChange={date => handleDateChange(date, 'dateFrom')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Box>
        <Box className='search-option' ml={2} width={160}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline-end'
            label='Date to'
            value={dateTo}
            onChange={date => handleDateChange(date, 'dateTo')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Box>
        <Box className='search-option' ml={2} width={160}>
          <Autocomplete
            onChange={(e, value) => e && setStatus(value?.value ?? '')}
            options={allStatus}
            getOptionLabel={option => option.label}
            renderInput={params => <TextField {...params} label='Status' margin='normal' />}
          />
        </Box>

        <Box className='search-option' mt={3} ml={2}>
          <Button
            startIcon={isLoading ? <LoadingIcon /> : <SearchIcon />}
            className='button'
            variant='contained'
            color='primary'
            style={{ width: 150, height: 40 }}
            onClick={handleSearch}
          >
            Search
          </Button>

          <Button
            startIcon={<ResetIcon />}
            className='button'
            variant='contained'
            color='default'
            style={{ width: 100, height: 40, marginLeft: 10 }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  )
}

export default SearchWithOptions

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import UploadIcon from '@material-ui/icons/CloudUpload'
import { convertFileToBase64 } from '../../utils'

export interface FileChanged {
  file: File
  base64: string | ArrayBuffer | null
}

export interface ValueChanged {
  key: string
  value: any
}

export interface SelectValue {
  id: string
  value?: string
  name?: string
}

export interface Props {
  id?: string
  label: string
  value?: string | number
  values?: SelectValue[]
  defaultValue?: string | string[]
  type?: 'input' | 'checkbox' | 'password' | 'select' | 'number' | 'file' | 'phone' | 'label' | 'textarea'
  disabled?: boolean
  required?: boolean
  checked?: boolean
  color?: string
  mt?: number | string
  mb?: number | string
  visible?: boolean
  onFileChanged?: (e: FileChanged) => void
  onValueChanged?: (e: ValueChanged) => void
}

export const RowInput = (props: Props): JSX.Element => {
  const {
    id,
    label,
    value,
    values,
    defaultValue,
    type,
    checked,
    disabled,
    required,
    color,
    visible,
    onFileChanged,
    onValueChanged,
    mt,
    mb,
  } = props
  if (visible === false) return <></>
  const handleFileChanged = async (e: any) => {
    const file = e.target.files[0]
    const base64 = (await convertFileToBase64(file)) as string
    onFileChanged && onFileChanged({ file, base64 })
  }

  const handleValueChanged = (key: string, value: any) => {
    const keyValue = key.trim()
    onValueChanged && onValueChanged({ key: keyValue, value })
  }

  const renderCheckboxes = (id: string) => {
    const checkboxes = []
    if (values?.length) {
      for (let i = 0; i < values?.length ?? 1; i++) {
        checkboxes.push(
          <FormControlLabel
            key={`checkbox-${i}`}
            checked={defaultValue?.includes(values[i].id)}
            className='checkbox'
            value={values[i].id ?? ''}
            control={<Checkbox color='primary' />}
            label={values[i].name ?? values[i].value ?? ''}
            labelPlacement='end'
            onChange={e => handleValueChanged(id, (e.target as any).value)}
          />,
        )
      }
    } else {
      return <Checkbox checked={checked} color='primary' onChange={() => handleValueChanged(id ?? label.toLowerCase(), !checked)} />
    }
    return checkboxes
  }

  const renderSelectOptions = (id: string) => {
    const renderItems = () => {
      const list = []
      for (let i = 0; i < (values?.length ?? 1); i++) {
        list.push(
          <MenuItem key={`select-${i}`} value={values && values[i].id}>
            {values && values[i].value}
          </MenuItem>,
        )
      }
      return list
    }

    return (
      <FormControl variant='outlined' fullWidth>
        <InputLabel id='simple-select-outlined-label'>{label}</InputLabel>
        <Select
          labelId='simple-select-outlined-label'
          id='simple-select-outlined'
          value={defaultValue ?? ''}
          onChange={e => handleValueChanged(id, e.target.value as any)}
          label={label}
        >
          {renderItems()}
        </Select>
      </FormControl>
    )
  }

  return (
    <Box display='flex' mt={mt} mb={mb}>
      <Box width={'25%'} display='flex' alignItems='center'>
        <Typography variant='h5' color='secondary'>
          {required && <span style={{ color: 'red', marginLeft: -7 }}>*</span>}
          {label}
        </Typography>
      </Box>
      <Box width={'75%'}>
        {(!type || type === 'input' || type === 'password' || type === 'number') && (
          <TextField
            className='main-input'
            fullWidth
            value={value}
            label={label}
            type={type}
            placeholder='Type a new value ...'
            variant='outlined'
            disabled={disabled}
            onChange={e => handleValueChanged(id ?? label.toLowerCase(), type === 'number' ? parseFloat(e.target.value) : e.target.value)}
          />
        )}
        {type === 'label' && (
          <Typography variant='h5' style={{ color: color ? color : '#2E384D' }}>
            {value}
          </Typography>
        )}
        {type === 'textarea' && (
          <TextareaAutosize
            aria-label={props.label}
            value={value}
            rowsMin={3}
            placeholder={props.label}
            onChange={e => handleValueChanged(id ?? label.toLowerCase(), e.target.value)}
            style={{ width: '100%', resize: 'none' }}
          />
        )}
        {type === 'checkbox' && <Box>{renderCheckboxes(id ?? label.toLowerCase())}</Box>}
        {type === 'select' && <Box>{renderSelectOptions(id ?? label.toLowerCase())}</Box>}
        {type === 'file' && (
          <Box display='flex' flexDirection='column'>
            {value && <img width={60} src={value as any} />}
            <Box mt={value ? 2 : 0}>
              <input style={{ display: 'none' }} id='contained-button-file' type='file' onChange={handleFileChanged} />
              <label htmlFor='contained-button-file'>
                <Button className='button' variant='contained' color='default' component='span' startIcon={<UploadIcon />}>
                  Choose a file
                </Button>
              </label>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default RowInput

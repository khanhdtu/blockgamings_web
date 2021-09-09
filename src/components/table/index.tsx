import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MatTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ViewIcon from '@material-ui/icons/Visibility'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import Avatar from '@material-ui/core/Avatar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { map, omit } from 'lodash'
import { format } from 'date-fns'
import { Props } from './types'
import { Switch } from '../switch'
import { formatFriendlyName, getTableDensePadding, setTableDensePadding } from '../../utils'
import { Status } from '../../components/status'
import { Dynamic } from '../../components/nossr'
import InputIcon from '@material-ui/icons/Input'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  data: any[]
  actions?: string[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const formatName = (name: string) => {
    let formatedName = ''
    for (let i = 0; i < name.length; i++) {
      if (name[i] === name[i].toLocaleLowerCase()) {
        formatedName += name[i]
      } else {
        formatedName += ` ${name[i]}`
      }
    }
    return formatedName.toLocaleUpperCase().replace(/_/g, ' ')
  }

  return (
    <TableHead>
      <TableRow>
        {Object.keys(props.data[0]).map(key => {
          if (key !== 'id' && key.length) {
            return (
              <TableCell key={`head-cell-${key}`} align={'left'} padding={'default'} sortDirection={orderBy === 'id' ? order : false}>
                <TableSortLabel active={key === 'id'} direction={orderBy === 'id' ? order : 'asc'} onClick={createSortHandler('id')}>
                  {formatName(key)}
                  {orderBy === 'id' ? (
                    <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          }
          return null
        })}
        {/* ACTIONS */}
        {props?.actions?.map(action => (
          <TableCell key={`head-cell-${action}`} />
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      backgroundColor: '#FFF !important',
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    cell: {
      maxWidth: 250,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  }),
)

export const Table = (props: Props): JSX.Element => {
  const classes = useStyles()
  const { data, actions, sortBy, totalPages = 0, currentPage = 0, currentRecord = 20, onRecord, onNext, onPrevious } = props
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<string>(sortBy ?? 'updatedAt')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(currentRecord ?? 20)
  const isMaximum = currentRecord * (currentPage + 1) >= totalPages

  useEffect(() => {
    setDense(getTableDensePadding())
  }, [])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    if (!event) return
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleChangeDense = (checked: boolean) => {
    setDense(checked)
    setTableDensePadding(checked)
  }

  const handleRecordChange = (record: number) => {
    setRowsPerPage(record)
    onRecord && onRecord(record)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  if (!props.data || !props.data.length)
    return (
      <Typography variant='h5' color='secondary'>
        No results were found!
      </Typography>
    )

  return (
    <Dynamic>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <MatTable className={classes.table} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                data={map(data, e => (props.omit ? omit(e, ...props.omit) : e))}
                actions={actions}
              />
              <TableBody>
                {stableSort(
                  map(data, e => (props.omit ? omit(e, ...props.omit) : e)),
                  getComparator(order, orderBy),
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id as string)

                    return (
                      <TableRow
                        key={`row-${index}`}
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        {Object.keys(row).map((key, i) => {
                          if (key === 'id') return
                          if (key === 'logo' || key === 'image') {
                            return (
                              <TableCell key={`${key}-${index}-${i}`} align='left'>
                                {row[key] && <Avatar src={row[key] as string} />}
                              </TableCell>
                            )
                          }
                          if (key === 'url') {
                            return (
                              <TableCell key={`${key}-${index}-${i}`} align='left'>
                                <a className='primary' href={row[key] as string} target='blank'>
                                  {row[key]}
                                </a>
                              </TableCell>
                            )
                          }
                          if (key === 'role') {
                            return (
                              <TableCell key={`${key}-${index}-${i}`} align='left'>
                                {formatFriendlyName(row[key] as string)}
                              </TableCell>
                            )
                          }
                          // if value = timestamp
                          if (key === 'updatedAt' || key === 'createdAt' || key === 'lastAccessAt') {
                            return (
                              <TableCell key={`${key}-${index}-${i}`} align='left'>
                                {row[key] ? format(new Date(row[key]), 'yyyy-MM-dd hh:mm') : <span style={{ fontSize: 20 }}>--:--</span>}
                              </TableCell>
                            )
                          }
                          if (typeof row[key] === 'boolean') {
                            return (
                              <TableCell key={`${key}-${index}-${i}`} align='left'>
                                {row[key] ? <CheckIcon fontSize='small' /> : <BlockIcon fontSize='small' />}
                              </TableCell>
                            )
                          }
                          return (
                            <TableCell className={classes.cell} key={`${key}-${index}-${i}`} align='left'>
                              {row[key] === 'ACTIVE' ||
                              row[key] === 'BLOCKED' ||
                              row[key] === 'CANCELED' ||
                              row[key] === 'PENDING' ||
                              row[key] === 'COMPLETED' ||
                              row[key] === 'PROCESSING' ? (
                                <Status status={row[key] as any} />
                              ) : (
                                row[key]
                              )}
                            </TableCell>
                          )
                        })}
                        {/* ACTIONS */}
                        {actions?.map(action => (
                          <TableCell className={classes.cell} key={`cell-${action}-${index}`} align='left' width={50}>
                            {action === 'edit' && (
                              <EditIcon
                                fontSize='small'
                                className='pointer'
                                onClick={() => props.onAction && props.onAction({ name: 'edit', itemId: row.id as string })}
                              />
                            )}
                            {action === 'view' && (
                              <ViewIcon
                                fontSize='small'
                                className='pointer'
                                onClick={() => props.onAction && props.onAction({ name: 'view', itemId: row.id as string })}
                              />
                            )}
                            {action === 'delete' && (
                              <DeleteIcon
                                fontSize='small'
                                className='pointer'
                                onClick={() => props.onAction && props.onAction({ name: 'delete', itemId: row.id as string })}
                              />
                            )}
                            {action === 'approve' && row.status === 'PENDING' && (
                              <CheckCircleIcon
                                fontSize='small'
                                className='pointer'
                                onClick={() => props.onAction && props.onAction({ name: 'approve', itemId: row.id as string })}
                              />
                            )}
                            {action === 'deposit' && (
                              <img
                                className='pointer'
                                src='/icons/deposit.svg'
                                width={20}
                                onClick={() => props.onAction && props.onAction({ name: 'approve', itemId: row.id as string })}
                              />
                            )}
                            {action === 'redirect' && (
                              <InputIcon
                                fontSize='small'
                                className='pointer'
                                onClick={() => props.onAction && props.onAction({ name: 'redirect', itemId: row.id as string })}
                              />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </MatTable>
          </TableContainer>
          <Box display='flex' alignItems='center' justifyContent='flex-end' p={1}>
            <span style={{ marginRight: 20 }}>Row per page</span>
            <Select
              style={{ marginRight: 20 }}
              defaultValue={currentRecord ?? 20}
              onChange={e => handleRecordChange(parseInt(e.target.value as any))}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>

            <Box>
              <span>
                {currentPage * currentRecord} - {isMaximum ? totalPages : currentRecord * (currentPage + 1)}
              </span>
              <span> of {totalPages}</span>
            </Box>

            <Box width={40} display='flex' alignItems='center' justifyContent='center'>
              <ChevronLeftIcon
                style={{ opacity: !currentPage ? 0.3 : 1 }}
                className={currentPage ? 'pointer' : ''}
                onClick={currentPage ? onPrevious : () => null}
              />
            </Box>
            <Box width={40} display='flex' alignItems='center' justifyContent='center'>
              <ChevronRightIcon
                style={{ opacity: isMaximum ? 0.3 : 1 }}
                className={!isMaximum ? 'pointer' : ''}
                onClick={!isMaximum ? onNext : () => null}
              />
            </Box>
          </Box>
        </Paper>
        <Switch checked={dense} label='Dense Padding' onChange={handleChangeDense} />
      </Box>
    </Dynamic>
  )
}

export default Table
export * from './types'

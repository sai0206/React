import { useGetUsersQuery } from '../services/jsonPlaceholderApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function UsersPage() {
  const { data, isLoading, isError } = useGetUsersQuery()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Failed to load users.</Alert>
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List dense>
        {data?.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}


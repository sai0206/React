import { useGetPostsQuery } from '../services/jsonPlaceholderApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function PostsPage() {
  const { data, isLoading, isError } = useGetPostsQuery()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Failed to load posts.</Alert>
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <List dense>
        {data?.slice(0, 20).map((post) => (
          <ListItem key={post.id} disablePadding>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

